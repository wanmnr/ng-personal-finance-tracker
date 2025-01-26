// transactions/models/transaction.interface.ts

import { Category } from "@app/features/dashboard/models/category.model";

export interface Transaction {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  category: Category;
  description: string;
  date: Date;
}
