<template>
  <!-- 
    controls:
      - play/pause
      - seek
      - volume
      - speed
   -->
  <div class="row">
    <div class="col-auto">
      <ControlButton @click="toggleStatus" :icon="statusIcon" bg-color="blue-3" text-color="blue-9" />
    </div>
    <div class="col-auto q-px-sm">
      <q-separator vertical class="full-height"/>
    </div>

    <div class="col-auto row q-col-gutter-x-xs">
      <div class="col-auto">
        <ControlButton @click="() => relativeSeek(-10)" icon="replay_10" />
      </div>
      <div class="col-auto">
        <ControlButton @click="() => relativeSeek(10)" icon="forward_10" />
      </div>
      <div class="col-auto">
        <volume-slider-button />
      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.volume-slider {
  width: 1em;
  // height: 5em;
  margin: 0.5em 0;
  transition: height 0.25s;
  // transform: scaleY(0);
  height: 0;
}
.active-slider {
  // transform: scaleY(1);
  height: 5em;
}
</style>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { PlayerStatus } from 'src/composables/AudioPlayer'

import ControlButton from 'src/components/Inputs/ControlButton.vue';
import VolumeSliderButton from 'src/components/Inputs/VolumeSliderButton.vue';

export type AudioFileControlsProps = {
  play: () => void;
  pause: () => void;
  seek: (position: number) => void;
  position: number;
  status: PlayerStatus;

  volume: number;
  setVolume: (volume: number) => void;

  speed: number;
  setSpeed: (speed: number) => void;
}

const props = defineProps<AudioFileControlsProps>()

const toggleStatus = () => props.status === PlayerStatus.PAUSED ? props.play() : props.pause()

const relativeSeek = (seconds: number) => {
  const newPosition = props.position + seconds
  props.seek(newPosition)
}

const statusIcon = computed(() => {
  return props.status === PlayerStatus.PAUSED ? 'pause' : 'play_arrow'
})

const vol = ref(0.5)
const showVolume = ref(false)
const toggleVolume = () => showVolume.value = !showVolume.value
</script>