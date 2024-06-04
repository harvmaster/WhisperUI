<template>
  <div class="row q-col-gutter-y-sm q-pa-md transcript-container" style="background-opacity: 0.8">
    <div class="col-auto" v-for="segment of flatSegments" :key="segment.word">
      <transcribed-segment :segment="segment" :file="file" @click="() => seek(segment.start)"/>
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
import { computed, onUpdated } from 'vue';
import AudioFile from 'src/core/AudioFile';
import useAudioPlayer from 'src/composables/useAudioPlayer';

export type TranscriptProps = {
  transcript: TranscribedAudio
  file: AudioFile;
}

const props = defineProps<TranscriptProps>()

const player = useAudioPlayer(props.file.src)
const {
  seek
} = player

const flatSegments = computed(() => {
  const segments = props.transcript.segments
  return segments.map(segment => segment.words.map(word => word)).flat()
})
</script>