import { ExpensesState, expensesStore } from '@/store/expenses/expenses.store';
import { InjectionKey } from 'vue';
import { createStore, Store, useStore } from 'vuex';

export type StateModel = ExpensesState;

export const StoreKey: InjectionKey<Store<StateModel>> = Symbol();

export function useMyStore(): Store<StateModel> {
  return useStore(StoreKey);
}

export default createStore<StateModel>({
  modules: {
    EXPENSES: expensesStore,
  },
});
