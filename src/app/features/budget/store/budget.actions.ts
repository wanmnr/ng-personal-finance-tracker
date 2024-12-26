// src/app/features/budget/store/budget.actions.ts

import { createAction, props } from '@ngrx/store';
import { Budget } from '../models/budget1.model';

/**
 * Action constants for budget operations
 */
export const LOAD_BUDGETS = '[Budget] Load Budgets';
export const LOAD_BUDGETS_SUCCESS = '[Budget] Load Budgets Success';
export const LOAD_BUDGETS_FAILURE = '[Budget] Load Budgets Failure';
export const CREATE_BUDGET = '[Budget] Create Budget';
export const CREATE_BUDGET_SUCCESS = '[Budget] Create Budget Success';
export const CREATE_BUDGET_FAILURE = '[Budget] Create Budget Failure';
export const UPDATE_BUDGET = '[Budget] Update Budget';
export const UPDATE_BUDGET_SUCCESS = '[Budget] Update Budget Success';
export const UPDATE_BUDGET_FAILURE = '[Budget] Update Budget Failure';
export const DELETE_BUDGET = '[Budget] Delete Budget';
export const DELETE_BUDGET_SUCCESS = '[Budget] Delete Budget Success';
export const DELETE_BUDGET_FAILURE = '[Budget] Delete Budget Failure';

/**
 * Load Budgets Actions
 */
export const loadBudgets = createAction(
  LOAD_BUDGETS
);

export const loadBudgetsSuccess = createAction(
  LOAD_BUDGETS_SUCCESS,
  props<{ budgets: Budget[] }>()
);

export const loadBudgetsFailure = createAction(
  LOAD_BUDGETS_FAILURE,
  props<{ error: any }>()
);

/**
 * Create Budget Actions
 */
export const createBudget = createAction(
  CREATE_BUDGET,
  props<{ budget: Budget }>()
);

export const createBudgetSuccess = createAction(
  CREATE_BUDGET_SUCCESS,
  props<{ budget: Budget }>()
);

export const createBudgetFailure = createAction(
  CREATE_BUDGET_FAILURE,
  props<{ error: any }>()
);

/**
 * Update Budget Actions
 */
export const updateBudget = createAction(
  UPDATE_BUDGET,
  props<{ budget: Budget }>()
);

export const updateBudgetSuccess = createAction(
  UPDATE_BUDGET_SUCCESS,
  props<{ budget: Budget }>()
);

export const updateBudgetFailure = createAction(
  UPDATE_BUDGET_FAILURE,
  props<{ error: any }>()
);

/**
 * Delete Budget Actions
 */
export const deleteBudget = createAction(
  DELETE_BUDGET,
  props<{ id: string }>()
);

export const deleteBudgetSuccess = createAction(
  DELETE_BUDGET_SUCCESS,
  props<{ id: string }>()
);

export const deleteBudgetFailure = createAction(
  DELETE_BUDGET_FAILURE,
  props<{ error: any }>()
);
