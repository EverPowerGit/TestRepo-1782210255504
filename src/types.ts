export interface Product {
  id: string;
  title: string;
  category: 'Electronics' | 'Apparel' | 'Home' | 'Groceries' | (string);
  price: number;
  images: string[];
  description: string;
  rating: number; // 0-5
  stock: number;
  tags?: string[];
}

export interface CartItem { product: Product; quantity: number; }

export interface UserProfile { name: string; email: string; }

export interface OrderLine { productId: string; title: string; price: number; quantity: number; }
export interface OrderInput { customerName: string; email: string; shippingAddress: string; lines: OrderLine[]; }
export interface OrderRecord extends OrderInput { orderId: string; createdAt: string; status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered'; }

export type HPResponse<T> = { success?: T; error?: string; promiseId?: string };
