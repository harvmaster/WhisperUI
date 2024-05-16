<template>
  <div class="audio-bar pill" :style="barStyles">

  </div>
</template>

<style lang="scss" scoped>
.audio-bar {
  width: 0.8em;;
  background-color: $blue-4;
  margin-right: 0.25em;
}
</style>

<script setup lang="ts">
import { ref, computed } from 'vue'

export type AudioBarProps = {
  amplitude: number
}

const props = defineProps<AudioBarProps>()

const amplitude = ref(props.amplitude)
const barStyles = computed(() => {
  const barHeight = amplitude.value * 40

  return {
    height: `${60 + barHeight}%`
  }
})
</script>