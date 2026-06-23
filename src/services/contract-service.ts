import * as bson from 'bson';
import type { HPResponse } from '@/types';

type HPClientLike = {
  connect: () => Promise<boolean>;
  submitContractReadRequest: (payload: Uint8Array | string) => Promise<unknown>;
  submitContractInput: (payload: Uint8Array | string) => Promise<{ submissionStatus: Promise<{ status: string; reason?: string }> }>;
  on: (event: string, handler: (result: { outputs: unknown[]; server?: string }) => void) => void;
};

type Pending = { resolve: (v: any) => void; reject: (e: any) => void };

export class ContractService {
  private static instance: ContractService;
  static getInstance() { if (!this.instance) this.instance = new ContractService(); return this.instance; }

  private keyPair: unknown | null = null;
  private client: HPClientLike | null = null;
  private mockMode = false;
  private pending = new Map<string, Pending>();

  private constructor() {}

  async init(): Promise<void> {
    const mode = import.meta.env.VITE_MOCK_MODE as string | undefined;
    const rawUrls = (import.meta.env.VITE_CONTRACT_URLS ?? '').trim();
    const isPlaceholder = /example|your-hotpocket|placeholder/i.test(rawUrls);
    const hasRealUrls = rawUrls.length > 0 && !isPlaceholder;

    if (mode === 'true' || (mode !== 'false' && !hasRealUrls)) {
      this.mockMode = true;
      console.warn('🔧 Running in MOCK MODE - using simulated data. Set VITE_MOCK_MODE=false and VITE_CONTRACT_URLS=wss://... to connect to real servers.');
      return;
    }

    if (mode === 'false' && !hasRealUrls) {
      throw new Error("VITE_MOCK_MODE is 'false' but VITE_CONTRACT_URLS has no valid wss:// servers. Add real server URLs, or set VITE_MOCK_MODE=true for development.");
    }

    const HotPocket = (window as any).HotPocket;
    if (!HotPocket) {
      console.warn('HotPocket CDN not found, falling back to mock mode.');
      this.mockMode = true;
      return;
    }

    if (!this.keyPair) this.keyPair = await HotPocket.generateKeys();
    const servers = rawUrls.split(',').map((s: string) => s.trim()).filter(Boolean);
    this.client = await HotPocket.createClient(servers, this.keyPair, { protocol: 'bson' });
    const ok = await this.client.connect();
    if (!ok) throw new Error('HotPocket connection failed');

    // Wire events
    const ev = HotPocket.events;
    this.client.on(ev.contractOutput, ({ outputs }: { outputs: unknown[] }) => {
      outputs.forEach((buf) => {
        try {
          const decoded = this.decode(buf);
          const pid = (decoded && typeof decoded === 'object' && 'promiseId' in decoded) ? (decoded as any).promiseId as string : undefined;
          if (pid && this.pending.has(pid)) {
            const p = this.pending.get(pid)!;
            this.pending.delete(pid);
            if ((decoded as any).error) p.reject((decoded as any).error);
            else p.resolve(decoded);
          }
        } catch (e) {
          console.error('Failed to handle contract output', e);
        }
      });
    });

    this.client.on(ev.disconnect, () => {
      console.warn('Disconnected from HotPocket. Reloading…');
      // In production you may implement reconnection logic instead of reload
      // location.reload();
    });

    this.client.on(ev.connectionChange, (evt: unknown) => {
      console.info('Connection change:', evt);
    });

    this.client.on(ev.healthEvent, (evt: unknown) => {
      console.info('Health event:', evt);
    });
  }

  async submitContractReadRequest(message: Record<string, unknown>): Promise<HPResponse<any>> {
    if (this.mockMode) return this.mockRead(message);
    if (!this.client) throw new Error('Client not initialized');
    const payload = this.encode({ ...message, promiseId: this.getUniqueId() });
    const raw = await this.client.submitContractReadRequest(payload);
    return this.decode(raw) as HPResponse<any>;
  }

  async submitInputToContract(message: Record<string, unknown>): Promise<HPResponse<any>> {
    if (this.mockMode) return this.mockWrite(message);
    if (!this.client) throw new Error('Client not initialized');
    const promiseId = this.getUniqueId();
    const payload = this.encode({ ...message, promiseId });
    const p = new Promise<HPResponse<any>>((resolve, reject) => this.pending.set(promiseId, { resolve, reject }));
    const r = await this.client.submitContractInput(payload);
    const status = await r.submissionStatus;
    if (status.status !== 'accepted') throw new Error(`Ledger rejection: ${status.reason || 'Unknown reason'}`);
    return p;
  }

  private encode(obj: any): Uint8Array { return bson.serialize(obj); }
  private decode(output: unknown): any {
    if (output instanceof Uint8Array) return bson.deserialize(output);
    if (typeof output === 'string') { try { return JSON.parse(output); } catch { return { success: output }; } }
    return output;
  }

  private getUniqueId(): string {
    const arr = new Uint8Array(16);
    crypto.getRandomValues(arr);
    return Array.from(arr).map((b) => b.toString(16).padStart(2, '0')).join('');
  }

  // --- MOCK IMPLEMENTATION ---
  private async delay(ms = 120) { await new Promise((r) => setTimeout(r, ms)); }

  private async mockRead(message: Record<string, any>): Promise<HPResponse<any>> {
    await this.delay();
    const { Service, Action, Data } = message;
    const { products } = await import('@/data/products');
    if (Service === 'Product' && Action === 'ListProducts') return { success: products };
    if (Service === 'Product' && Action === 'GetProductById') return { success: products.find((p) => p.id === Data?.id) };
    if (Service === 'Order' && Action === 'ListOrders') return { success: [] };
    return { success: null };
  }

  private async mockWrite(message: Record<string, any>): Promise<HPResponse<any>> {
    await this.delay();
    const { Service, Action, Data } = message;
    if (Service === 'Order' && Action === 'CreateOrder') {
      return { success: { orderId: `ord_${Date.now()}`, createdAt: new Date().toISOString(), status: 'Processing', ...Data } };
    }
    if (Service === 'Product' && Action === 'UpdateInventory') return { success: true };
    return { success: null };
  }
}
