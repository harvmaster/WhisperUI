<template>
  <div class="row whisper-input">
    <div v-if="icon" class="col-auto q-pl-sm">
      <q-icon class="full-height" name="search" size="1.5em" color="blue-6" />
    </div>
    <input v-model="model" type="text" class="col blank-input" :placeholder="placeholder" :style="inputStyles" />
  </div>
</template>

<style lang="scss" scoped>
.whisper-input {
  border-radius: 0.5em;
  border: 1px solid #c7c7c7;
  overflow: hidden;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.1);
}

.blank-input {
  border: none;
  box-shadow: none;
  outline: none;
  height: 100%;
  padding: 0.5em;
}

.blank-input:focus {
  outline: var(--focused-color);
}
</style>

<script setup lang="ts">
import { computed } from 'vue';

export type SearchInputProps = {
  placeholder?: string;
  icon?: string;

  focusedColor?: string;
}

const props = defineProps<SearchInputProps>()
const model = defineModel()

const inputStyles = computed(() => {
  const focusedColor = props.focusedColor
  return {
    '--focused-color': focusedColor && `auto 1px ${focusedColor}`
  }
})

</script>