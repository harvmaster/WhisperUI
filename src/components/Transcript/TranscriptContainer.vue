<template>
  <div class="row q-col-gutter-y-sm q-pa-md transcript-container bg-primary">
    <div class="col-auto" v-for="segment of flatSegments" :key="segment.word">
      <transcribed-segment :segment="segment" :faded="segment.start > position" @click="() => setPosition(segment.start)"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.transcript-container {
  font-size: 1.5em;
  font-weight: 600;
  line-height: 2em;
}
</style>

<script setup lang="ts">
import { TranscribedAudio } from 'src/types'
import TranscribedSegment from './TranscribedSegment.vue'
import { computed } from 'vue';

export type TranscriptProps = {
  transcript: TranscribedAudio
  position: number;
  setPosition: (position: number) => void;
}

const props = defineProps<TranscriptProps>()

const flatSegments = computed(() => {
  const segments = props.transcript.segments
  return segments.map(segment => segment.words.map(word => word)).flat()
})
</script>