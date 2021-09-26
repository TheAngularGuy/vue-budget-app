<template>
  <header>
    <div class="left">
      <div class="back" v-if="hasBackAction" @click="onBackClicked">
        <ElIcon :size="30">
          <Back/>
        </ElIcon>
      </div>
      <h1 class="title">
        <slot>
          Budget App
        </slot>
      </h1>
    </div>
    <div class="actions" v-if="$slots.actions">
      <slot name="actions"></slot>
    </div>
  </header>
</template>

<script lang="ts">
import { Back } from '@element-plus/icons';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseHeader',
  components: {
    Back,
  },
  props: {
    backAction: {
      type: Boolean,
    },
  },
  emits: {
    backClicked() {
      return true;
    }
  },
  computed: {
    hasBackAction() {
      return this.$props.backAction;
    }
  },
  methods: {
    onBackClicked() {
      this.$emit('backClicked');
    }
  }
});
</script>

<style lang="scss" scoped>
header {
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 90px;
  border-bottom: 1px solid var(--el-border-color-base);

  .back {
    cursor: pointer;
  }

  .left {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;

    .title {
      margin: 0;
    }
  }
}
</style>
