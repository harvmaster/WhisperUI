<template>
  <div class="transcript-segment" :class="{ 'faded': faded, 'q-pr-sm': isJoiningWord }">
    {{ segment }}
  </div>
</template>

<style lang="scss" scoped>
.transcript-segment {
  line-height: 2em;
  transition: opacity 0.3s;
  opacity: 1
}
.transcript-segment.faded {
  opacity: 0.7;
}
</style>

<script setup lang="ts">
import { computed } from 'vue';

export type TranscribedSegmentProps = {
  segment: string;
  faded: boolean;
}

const props = defineProps<TranscribedSegmentProps>()


const wordJoiners = [
  '-',
  '/',
]
const isJoiningWord = computed(() => {
  return wordJoiners.some(joiner => props.segment.startsWith(joiner))
})
</script>