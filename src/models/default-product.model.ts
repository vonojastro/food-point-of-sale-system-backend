export interface DefaultProduct {
  id: string;
  productName: string;
  description?: string;
  brand?: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
  userId?: string;
  supplier?: string;
  storageLocation?: string;
  costPerUnit: number;
  retailPrice: number;
  wholesalePrice: number;
  unit: string;
}

export interface Category {
  id?: string;
  posType: string;
  categoryName: string;
  userId?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}
