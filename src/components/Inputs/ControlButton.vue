<template>
  <button class="control-button">
    <slot>
      <!-- Default slot content -->
      <div class="control-button-icon">
        <Transition name="fade" mode="out-in">
          <q-icon :key="icon" :name="icon" />
        </Transition>
      </div>

    </slot>
  </button>
</template>

<style lang="scss" scoped>
.control-button {
  width: fit-content;
  height: fit-content;
  padding: 0.5rem;
  border-radius: 1rem;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>

<script setup lang="ts">
export type ControlButtonProps = {
  icon: string;
  color: string;
  onClick: () => void;
}

const props = defineProps<ControlButtonProps>()
</script>