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
  amplitude: number;
  fill: number; // value between 0 and 1
}

const props = defineProps<AudioBarProps>()

const amplitude = ref(props.amplitude)
const barStyles = computed(() => {
  const barHeight = amplitude.value * 40

  return {
    height: `${60 + barHeight}%`,
    // transition between blue-2 to blue-4 based on fill
    backgroundColor: `hsl(200, 100%, ${70 - props.fill * 20}%)`
  }
})
</script>