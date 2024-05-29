<template>
  <div class="row q-col-gutter-y-sm q-pa-md">
    <div class="col-12" v-for="segment of transcript.segments" :key="segment.text">
      <transcribed-segment :segment="segment" />
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script setup lang="ts">
import { TranscribedAudio } from 'src/types'
import TranscribedSegment from './TranscribedSegment.vue'

export type TranscriptProps = {
  transcript: TranscribedAudio
}

const props = defineProps<TranscriptProps>()


</script>