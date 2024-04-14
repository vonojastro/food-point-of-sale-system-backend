export interface FoodProduct {
  id: string;
  name: string;
  details?: string;
  price: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
  userId?: string;
  category: string;
}
