<template>
  <div class="row">
    <div class="col-auto">
      Speaker
    </div>
    <div class="col">
      {{ transcript.start }}
    </div>
    <div class="col-12">
      {{ transcript.text }}
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script setup lang="ts">
import { TranscribedAudioSegment } from 'src/types'

export type TranscribedSegmentProps = {
  segment: TranscribedAudioSegment;
}

const props = defineProps<TranscribedSegmentProps>()

</script>