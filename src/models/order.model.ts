export interface Order {
  orderId?: string;
  userId: string;
  posType: string;
  paymentType: string;
  createdAt?: Date;
  updatedAt?: Date;
  totalAmount: number;
  items: OrderItem[];
}

export interface OrderItem {
  id: string;
  productName: string;
  description: string;
  productId?: string;
  quantity: number;
  subtotal: number;
  createdAt: Date;
  updatedAt: Date;
  order?: Order | null;
  orderId?: string | null;
}
