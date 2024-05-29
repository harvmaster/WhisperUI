<template>
  <div class="row segment-container">
    <div class="col-auto text-weight-bold text-green-7 q-pb-sm">
      Speaker
    </div>
    <div class="col text-right text-muted text-subtitle2">
      [{{ startTime }}]
    </div>
    <div class="col-12">
      {{ segment.text }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.segment-container {
  padding: 0.5em;
  border-radius: 0.5em;
  background-color: rgb(250, 250, 250);
  margin-bottom: 0.5em;
  border: 2px solid rgb(235, 235, 235);
  font-size: 1.25em;
}
</style>

<script setup lang="ts">
import { TranscribedAudioSegment } from 'src/types'
import { numToLocaleTime } from 'src/lib/Time';
import { computed } from 'vue';

export type TranscribedSegmentProps = {
  segment: TranscribedAudioSegment;
}

const props = defineProps<TranscribedSegmentProps>()

const startTime = computed(() => (numToLocaleTime(props.segment.start)))

</script>