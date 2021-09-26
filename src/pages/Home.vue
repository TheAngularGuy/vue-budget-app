<template>
  <BaseLayout>
    <div class="home">
      <ExpenseList :expenses="expenses" @clickedExpense="onClickedExpense"></ExpenseList>

      <AddExpense @click="onAddExpense"></AddExpense>
    </div>
  </BaseLayout>
</template>

<script lang="ts">
import AddExpense from '@/components/AddExpense.vue';
import ExpenseList from '@/components/ExpenseList.vue';
import BaseLayout from '@/layouts/BaseLayout.vue';
import { Expense } from '@/models/Expense.model';
import { useMyStore } from '@/store/store';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Home',
  components: { BaseLayout, AddExpense, ExpenseList },

  setup: () => {
    const router = useRouter();
    const store = useMyStore();
    const expenses: Expense[] = store.getters.expenses;

    const onClickedExpense = (expense: Expense) => {
      router.push({
        name: 'EditExpense',
        params: {
          id: expense.id,
        },
      });
    };

    const onAddExpense = () => {
      router.push({
        name: 'EditExpense',
        params: {
          id: 'new',
        },
      });
    };

    return { expenses, onClickedExpense, onAddExpense };
  },
});
</script>

<style lang="scss" scoped>
.home {
  padding: 1rem;
}
</style>
