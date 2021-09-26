<template>
  <ElButton type="primary" class="add-btn">
    <ElIcon class="icon">
      <CirclePlusFilled/>
    </ElIcon>
    <span>Add Expense</span>
  </ElButton>
</template>

<script lang="ts">
import { CirclePlusFilled } from '@element-plus/icons';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AddExpense',
  components: {
    CirclePlusFilled,
  },
});
</script>

<style lang="scss" scoped>
:host {
  width: 100%;
}

.add-btn {
  width: 100%;
  margin: 2rem auto 0;
  display: flex;
  align-items: center;
  justify-content: center;

  .icon {
    margin-right: .5rem;
    transform: translateY(2px);
  }
}
</style>
