<template>
  <div class="row q-col-gutter-y-sm q-pa-md transcript-container bg-primary">
    <div class="col-12" v-for="segment of transcript.segments" :key="segment.text">
      <transcribed-segment :segment="segment" :class="{ 'text-muted': segment.text.length % 2 }" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
// .transcript-container {
//   background-color: var(--primary);
// }
</style>

<script setup lang="ts">
import { TranscribedAudio } from 'src/types'
import TranscribedSegment from './TranscribedSegment.vue'

export type TranscriptProps = {
  transcript: TranscribedAudio
}

const props = defineProps<TranscriptProps>()


</script>