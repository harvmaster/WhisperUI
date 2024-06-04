<template>
  <div class="transcript-segment" :class="{ 'faded': faded, 'new-word': !isJoiningWord }">
    <div class="segment-timestamp">
      {{ startTime }}
    </div>
    {{ segment.word }}
  </div>
</template>

<style lang="scss" scoped>
.transcript-segment {
  line-height: 2.5em;
  transition: opacity 0.3s;
  opacity: 1;
  cursor: pointer;

  position: relative;
  --timestamp-opacity: 0; 
}
.transcript-segment.faded {
  opacity: 0.7;
}
.transcript-segment:hover {
  --timestamp-opacity: 1; 
}
.segment-timestamp {
  font-size: 0.5em;
  user-select: none;

  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 2em);
  opacity: var(--timestamp-opacity, 0.5);
  transition: opacity 0.3s;
}

.new-word::after {
    content: "\00a0";
}
</style>

<script setup lang="ts">
import useAudioPlayer from 'src/composables/useAudioPlayer';
import AudioFile from 'src/core/AudioFile';
import { numToLocaleTime } from 'src/lib/Time';
import { TranscribedAudioSegmentWord } from 'src/types';
import { computed, onMounted, onUpdated } from 'vue';

export type TranscribedSegmentProps = {
  segment: TranscribedAudioSegmentWord;
  file: AudioFile
}

const props = defineProps<TranscribedSegmentProps>()

const player = useAudioPlayer(props.file.src)
const {
  position
} = player

const faded = computed(() => {
  return position.value < props.segment.start
})

const wordJoiners = [
  '-',
  '/',
]
const isJoiningWord = computed(() => {
  return wordJoiners.some(joiner => props.segment.word.startsWith(joiner))
})

const startTime = computed(() => {
  return numToLocaleTime(props.segment.start)
})
</script>