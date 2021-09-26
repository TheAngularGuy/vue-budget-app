<template>
  <BaseLayout>
    <template #header>
      <BaseHeader :back-action="true" @backClicked="onGoBack">
        {{ headerText }}
        <template #actions>
          <ElDropdown trigger="click">
            <template #default>
              <ElIcon :size="20">
                <MoreFilled></MoreFilled>
              </ElIcon>
            </template>
            <template #dropdown>
              <ElDropdownMenu>
                <ElDropdownItem v-if="!startedEditing && !isCreation" @click="onStartEditing">
                  <ElIcon>
                    <Edit></Edit>
                  </ElIcon>
                  &nbsp;
                  Edit
                </ElDropdownItem>
                <el-dropdown-item class="danger-item" @click="removeDialogVisible = true">
                  <ElIcon>
                    <DeleteFilled></DeleteFilled>
                  </ElIcon>
                  &nbsp;
                  Delete
                </el-dropdown-item>
              </ElDropdownMenu>
            </template>
          </ElDropdown>
        </template>
      </BaseHeader>
    </template>

    <ElDialog v-model="removeDialogVisible" title="Delete this expense?" width="90vw" top="50vh">
      <span>Are you sure you want to delete this?</span>
      <template #footer>
        <span>
          <ElButton @click="removeDialogVisible = false">Cancel</ElButton>
          <ElButton type="primary" @click="removeDialogVisible = false; onRemoveExpense()">Confirm</ElButton>
        </span>
      </template>
    </ElDialog>

    <div class="edit">
      <template v-if="isCreation || startedEditing">
        <ElForm label-width="120px" :model="expense" @submit.prevent ref="form">
          <ElFormItem label="Title" prop="title" :rules="[{ required: true, message: 'age is required' }]">
            <ElInput autocomplete="off" v-model.trim="expense.title">
            </ElInput>
          </ElFormItem>
          <ElFormItem label="Description" prop="description" :rules="[]">
            <ElInput autocomplete="off" v-model.trim="expense.description">
            </ElInput>
          </ElFormItem>
          <ElFormItem label="Amount" prop="amount" :rules="[
            { required: true, message: 'age is required' },
            { type: 'number', message: 'age must be a number' },
          ]">
            <ElInput autocomplete="off" v-model.number="expense.amount">
            </ElInput>
          </ElFormItem>

          <AddExpense @click="onAddExpense"></AddExpense>
          <ElButton v-if="startedEditing" class="cancel-btn" @click="onCancelEditing" plain>
            <ElIcon>
              <Close></Close>
            </ElIcon>
            Cancel
          </ElButton>
        </ElForm>
      </template>
      <template v-else>
        <p class="small">Title</p>
        <p>{{ expense.title }}</p>
        <p class="small">Description</p>
        <p>{{ expense.description || '/' }}</p>
        <p class="small">Amount</p>
        <p>{{ expense.amount }}</p>
      </template>
    </div>
  </BaseLayout>
</template>

<script lang="ts">
import AddExpense from '@/components/AddExpense.vue';
import BaseHeader from '@/layouts/BaseHeader.vue';
import BaseLayout from '@/layouts/BaseLayout.vue';
import { Expense } from '@/models/Expense.model';
import { AddExpenseAction, RemoveExpenseAction } from '@/store/expenses/expenses.actions';
import { useMyStore } from '@/store/store';
import { Close, DeleteFilled, Edit, MoreFilled } from '@element-plus/icons';
import { UnwrapNestedRefs } from '@vue/reactivity';
import { computed, defineComponent, onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  name: 'EditExpense',
  components: { BaseHeader, BaseLayout, AddExpense, Edit, Close, MoreFilled, DeleteFilled },
  setup: () => {
    const store = useMyStore();
    const router = useRouter();
    const route = useRoute();
    const form = ref(null);
    const startedEditing = ref(false);
    const removeDialogVisible = ref(false);
    const foundExpense: Expense = store.getters.expenses.find((el: Expense) => String(el.id) === route.params.id);
    const expense: UnwrapNestedRefs<Expense> = reactive({ title: '', description: '', amount: null, id: Date.now() });
    const headerText = computed(() => {
      return expense ? 'Expense' : 'Add an expense';
    });
    const isCreation = computed(() => {
      return !foundExpense;
    });

    onMounted(() => {
      init();
    });

    function init() {
      expense.title = foundExpense?.title || '';
      expense.description = foundExpense?.description || '';
      expense.amount = foundExpense?.amount || null;
      expense.id = foundExpense?.id || Date.now();
    }

    function onStartEditing() {
      startedEditing.value = !startedEditing.value;
    }

    function onCancelEditing() {
      startedEditing.value = false;
      init();
    }

    function onAddExpense() {
      form.value.validate((isValid: boolean) => {
        if (isValid) {
          store.dispatch(new AddExpenseAction(expense));
          router.push({
            name: 'Home',
          });
        }
      });
    }

    function onRemoveExpense() {
      store.dispatch(new RemoveExpenseAction(expense));
      onGoBack();
    }

    function onGoBack() {
      router.back();
    }

    return {
      headerText,
      onGoBack,
      isCreation,
      startedEditing,
      onStartEditing,
      form,
      expense,
      onAddExpense,
      onRemoveExpense,
      onCancelEditing,
      removeDialogVisible,
    };
  },
});

</script>


<style lang="scss" scoped>
.edit {
  padding: 0 1rem;

  .cancel-btn {
    width: 100%;
    margin: 1rem 0;
  }

  p {
    margin-top: 0;

    &.small {
      font-size: var(--el-font-size-small);
      margin: 0;
    }
  }
}

.danger-item {
  &:hover {
    color: var(--el-color-error);
    background-color: var(--el-color-error-lighter);
  }
}
</style>
