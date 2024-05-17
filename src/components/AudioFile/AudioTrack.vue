<!-- Contains all the little bars that will display where the current track is up to and the volume amplitude of the track -->
<!-- Not sure how im going to make the amount of pill dynamic yet -->
<template>
  <div class="">
    <div ref="audioTrackContainer" class="audio-track-container row relative">
      <audio-bar v-for="(bar, index) of audioBars" :key="index" :amplitude="bar" :fill="barPositions[index]" class="audio-bar pill col-auto self-center" />
      <div class="seeker" @click="seekAudio" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.audio-track-container {
  width: 100%;
  height: 100%;
}

.seeker {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  cursor: pointer;

}
</style>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import AudioBar from './AudioBar.vue'

import useAudioPlayer from 'src/composables/useAudioPlayer';

export type AudioTrackProps = {
  waveform: {
    waveforms: number[];
    sampleRate: number;
  };
  duration: number;
  position: number;

  seek: (position: number) => void;
}

const props = defineProps<AudioTrackProps>()

const windowWidth = ref<number>()
window.addEventListener('resize', () => {
  windowWidth.value = window.innerWidth
})

const audioTrackContainer = ref<HTMLElement | null>(null)
const audioBarCount = computed(() => {
  const width = windowWidth.value
  const container = audioTrackContainer.value
  if (!container) return 0

  const containerWidth = container.clientWidth
  const barWidth = 0.8 // em
  const barMargin = 0.25 // em

  console.log(parseInt(getComputedStyle(container).fontSize))
  const emToPx = getComputedStyle(container).fontSize ? parseInt(getComputedStyle(container).fontSize) : 16
  const barWidthPx = barWidth * emToPx
  const barMarginPx = barMargin * emToPx

  return Math.floor(containerWidth / (barWidthPx + barMarginPx))
})

const audioBars = computed(() => {
  // conver the 2000 waveforms into the number of bars that can fit on the screen
  // then map the waveforms to the bars
  // average the groups waveforms

  const { waveform: { waveforms: waveform } } = props

  const bars = audioBarCount.value
  const barWidth = waveform.length / bars

  const averaged = Array(bars).fill(0).map((_, i) => {
    const start = i * barWidth
    const end = (i + 1) * barWidth

    const group = waveform.slice(start, end)
    return group.reduce((acc, val) => acc + val, 0) / group.length
  })

  return averaged
})

const seekAudio = (e: MouseEvent) => {
  const container = audioTrackContainer.value
  if (!container) return

  const rect = container.getBoundingClientRect()
  const x = e.clientX - rect.left
  const width = container.clientWidth

  const position = x / width

  const newPosition = position * props.duration
  console.log(newPosition)
  props.seek(newPosition)
}

const barPositions = ref<number[]>(new Array(50).fill(0))
watch(() => props.position, () => {
  const position = props.position
  const duration = props.duration

  const positionPercentage = position / duration
  const container = audioTrackContainer.value
  if (!container) return
  // if (barPositions.value.length === 0) barPositions.value = Array(audioBars.value.length).fill(0)

  const bars = audioBars.value
  if (bars.length != barPositions.value.length) barPositions.value = Array(bars.length).fill(0)

  const barPositionDec = bars.length * positionPercentage
  const barPosition = Math.floor(bars.length * positionPercentage)

  // console.log('computing bar positions', barPosition, barPositionDec, barPositions.value.length, bars.length)
  bars.forEach((_, i) => {
    if (i < barPosition) barPositions.value[i] = 1
    else if (i > barPosition) barPositions.value[i] = 0
    else barPositions.value[i] = barPositionDec - barPosition
  })
})

</script>
