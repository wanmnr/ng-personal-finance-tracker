// @features/dashboard/models/finance2.model.ts
export interface Transaction {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: Date;
  description: string;
  status: 'pending' | 'completed' | 'cancelled';
  paymentMethod: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
  budget?: number;
}
