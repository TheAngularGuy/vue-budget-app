import { Expense } from '@/models/Expense.model';
import { AddExpenseAction, RemoveExpenseAction } from '@/store/expenses/expenses.actions';
import { Module } from 'vuex';

const enum StateStorageKeys {
  expenses = 'EXPENSES'
}

export interface ExpensesState {
  expenses: Expense[];
}

export const expensesStore: Module<ExpensesState, unknown> = {
  state: {
    expenses: JSON.parse(window.localStorage.getItem(StateStorageKeys.expenses)) || [],
  },
  getters: {
    expenses: (state) => state.expenses,
  },
  mutations: {
    addExpense: (state: ExpensesState, expense: Expense) => {
      state.expenses.push(expense);
      window.localStorage.setItem(StateStorageKeys.expenses, JSON.stringify(state.expenses))
    },
    removeExpense: (state: ExpensesState, expense: Expense) => {
      const index = state.expenses.findIndex(el => el.id === expense.id);
      if (index >= 0) {
        state.expenses.splice(index, 1);
        window.localStorage.setItem(StateStorageKeys.expenses, JSON.stringify(state.expenses))
      }
    },
  },
  actions: {
    addExpense: (ctx, action: AddExpenseAction) => {
      ctx.commit('addExpense', action.expense);
    },
    removeExpense: (ctx, action: RemoveExpenseAction) => {
      ctx.commit('removeExpense', action.expense);
    },
  },
};
