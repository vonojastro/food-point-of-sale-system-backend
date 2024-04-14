import { FoodProduct } from './food-product.model';

export interface RegisteredUser {
  email: string;
  username: string;
  token: string;
  product: FoodProduct[];
  createdAt: Date;
  updatedAt: Date;
}
