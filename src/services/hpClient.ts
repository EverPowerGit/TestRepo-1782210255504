import { ContractService } from './contract-service';
import type { OrderInput, OrderRecord, Product } from '@/types';

// Typed stubs that call ContractService. Replace with concrete Evernode actions later.

export async function connect(): Promise<void> {
  await ContractService.getInstance().init();
}

export async function getProducts(): Promise<Product[]> {
  const res = await ContractService.getInstance().submitContractReadRequest({ Service: 'Product', Action: 'ListProducts', Data: null });
  if (res.error) throw new Error(res.error);
  return (res.success as Product[]) ?? [];
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const res = await ContractService.getInstance().submitContractReadRequest({ Service: 'Product', Action: 'GetProductById', Data: { id } });
  if (res.error) throw new Error(res.error);
  return res.success as Product | undefined;
}

export async function createOrder(order: OrderInput): Promise<OrderRecord> {
  const res = await ContractService.getInstance().submitInputToContract({ Service: 'Order', Action: 'CreateOrder', Data: order });
  if (res.error) throw new Error(res.error);
  return res.success as OrderRecord;
}

export async function listOrders(): Promise<OrderRecord[]> {
  const res = await ContractService.getInstance().submitContractReadRequest({ Service: 'Order', Action: 'ListOrders', Data: null });
  if (res.error) throw new Error(res.error);
  return (res.success as OrderRecord[]) ?? [];
}

export async function updateInventory(input: { productId: string; delta: number }): Promise<boolean> {
  const res = await ContractService.getInstance().submitInputToContract({ Service: 'Product', Action: 'UpdateInventory', Data: input });
  if (res.error) throw new Error(res.error);
  return Boolean(res.success);
}
