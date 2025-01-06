// transactions/services/category.service.ts

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TransactionCategory } from '../types/transaction.types';

/**
 * Service for managing transaction categories
 */
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly categories: TransactionCategory[] = [
    {
      id: '1',
      name: 'Groceries',
      icon: 'shopping-cart',
      type: 'expense'
    },
    {
      id: '2',
      name: 'Rent',
      icon: 'home',
      type: 'expense'
    },
    {
      id: '3',
      name: 'Salary',
      icon: 'money-bill',
      type: 'income'
    },
    {
      id: '4',
      name: 'Entertainment',
      icon: 'film',
      type: 'expense'
    },
    {
      id: '5',
      name: 'Transportation',
      icon: 'car',
      type: 'expense'
    }
  ];

  /**
   * Gets all categories
   */
  getCategories(): Observable<TransactionCategory[]> {
    return of(this.categories);
  }

  /**
   * Gets a category by ID
   */
  getCategoryById(id: string): Observable<TransactionCategory | undefined> {
    return of(this.categories.find(category => category.id === id));
  }

  /**
   * Gets categories by type
   */
  getCategoriesByType(type: 'income' | 'expense'): Observable<TransactionCategory[]> {
    return of(this.categories.filter(category => category.type === type));
  }
}
