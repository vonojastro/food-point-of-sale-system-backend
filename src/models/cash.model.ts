export interface Expense {
  expenseId?: string;
  userId?: string;
  posType: string;
  amount: number;
  description: string;
  subDescription?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CashAdded {
  incomeId?: string;
  userId?: string | null;
  posType: string;
  amount: number;
  description: string;
  subDescription?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
