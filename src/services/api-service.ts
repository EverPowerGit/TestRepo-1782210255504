import type { OrderInput, OrderRecord, Product } from '@/types';
import * as hpClient from './hpClient';

export class ApiService {
  private static instance: ApiService;
  static getInstance(): ApiService { if (!this.instance) this.instance = new ApiService(); return this.instance; }
  private constructor() {}

  async getProducts(): Promise<Product[]> { return hpClient.getProducts(); }
  async getProductById(id: string): Promise<Product | undefined> { return hpClient.getProductById(id); }
  async createOrder(input: OrderInput): Promise<OrderRecord> { return hpClient.createOrder(input); }
  async listOrders(): Promise<OrderRecord[]> { return hpClient.listOrders(); }
  async updateInventory(input: { productId: string; delta: number }): Promise<boolean> { return hpClient.updateInventory(input); }
}
