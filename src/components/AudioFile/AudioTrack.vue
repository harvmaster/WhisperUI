<!-- Contains all the little bars that will display where the current track is up to and the volume amplitude of the track -->
<!-- Not sure how im going to make the amount of pill dynamic yet -->
<template>
  <div class="">
    <div ref="audioTrackContainer" class="audio-track-container row">
      <audio-bar v-for="i in audioBarCount" :key="i" :amplitude="Math.random()" class="audio-bar pill col-auto self-center" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.audio-track-container {
  width: 100%;
  height: 100%;
}
</style>

<script setup lang="ts">
import { computed, ref } from 'vue';
import AudioBar from './AudioBar.vue'

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

</script>
