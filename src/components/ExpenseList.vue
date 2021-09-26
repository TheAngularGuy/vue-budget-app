<template>
  <ElEmpty description="No Expenses" v-if="!expenses?.length"></ElEmpty>
  <div class="list" v-else>
    <p>Expenses:</p>
    <ul>
      <li v-for="expense in expenses" :key="expense.id" @click="onClickedExpense(expense)">
        <p>
          <span>{{ expense.title }}</span>
          <small>{{ expense.description || '-' }}</small>
        </p>
        <span>
          {{ expense.amount }} €
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Expense } from '@/models/Expense.model';
import { defineComponent, PropType, SetupContext } from 'vue';

export default defineComponent({
  name: 'ExpenseList',
  props: {
    expenses: {
      type: Array as PropType<Expense[]>,
    },
  },
  emits: {
    clickedExpense(expense: Expense) {
      return !!expense;
    },
  },

  setup(props, context: SetupContext) {
    const onClickedExpense = (expense: Expense) => {
      context.emit('clickedExpense', expense);
    };

    return { onClickedExpense };
  },
});
</script>

<style lang="scss" scoped>
.list {
  ul {
    list-style: none;
    padding: 0;

    li {
      cursor: pointer;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: var(--el-color-primary-light-9);
      padding: 2rem;

      &:first-of-type {
        border-radius: var(--el-border-radius-base) var(--el-border-radius-base) 0 0;
      }
      &:last-of-type {
        border-radius: 0 0 var(--el-border-radius-base) var(--el-border-radius-base);
      }
      &:nth-child(odd) {
        background-color: var(--el-color-primary-light-8);
      }

      p {
        margin: 0;
        display: flex;
        flex-direction: column;
      }
    }
  }
}
</style>
