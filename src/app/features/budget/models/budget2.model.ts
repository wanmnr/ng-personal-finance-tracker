// src/app/features/budget/models/budget2.model.ts

export interface Budget {
  id: string;
  category: string;
  limit: number;
  spent: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface BudgetDialogData {  // More specific name
  mode: 'add' | 'edit';
  budget?: Budget;
}

export type CreateBudgetDto = Omit<Budget, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateBudgetDto = Partial<CreateBudgetDto>;

