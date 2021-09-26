import { Expense } from '@/models/Expense.model';

export class AddExpenseAction {
  public type = 'addExpense';

  constructor(public expense: Expense) {}
}

export class RemoveExpenseAction {
  public type = 'removeExpense';

  constructor(public expense: Expense) {}
}
