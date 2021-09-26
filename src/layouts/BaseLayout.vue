<template>
  <div class="layout">
    <slot name="header">
      <BaseHeader>
          Budget App
      </BaseHeader>
    </slot>
    <main class="main">
      <slot></slot>
    </main>

    <aside class="side">
      <nav class="navigation">
        <router-link to="/home">
          Home
        </router-link>
        |
        <router-link to="/about">
          About
        </router-link>
      </nav>
    </aside>
  </div>
</template>

<script lang="ts">
import BaseHeader from '@/layouts/BaseHeader.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'baseLayout',
  components: { BaseHeader },
});
</script>

<style scoped lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  height: 100%;

  .main {
    padding-top: 1rem;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  .side {
    position: absolute;
    display: none;

    .navigation {
      margin: 0 1rem;

      a {
        all: unset;
        cursor: pointer;
        font-weight: bold;

        &.router-link-active {
          color: var(--el-color-primary);
        }
      }
    }
  }
}

</style>
