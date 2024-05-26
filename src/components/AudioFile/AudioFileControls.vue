<template>
  <!-- 
    controls:
      - play/pause
      - seek
      - volume
      - speed
   -->
  <div class="row q-col-gutter-y-sm">
    <div class="col-auto">
      <ControlButton @click="toggleStatus" :icon="statusIcon" bg-color="blue-3" text-color="blue-6" />
    </div>

    <div class="col-auto q-px-sm">
      <q-separator vertical class="full-height"/>
    </div>

    <div class="col-auto row q-col-gutter-x-xs q-col-gutter-y-sm">
      <div class="col-auto">
        <ControlButton @click="() => relativeSeek(-10)" icon="replay_10" />
      </div>
      <div class="col-auto">
        <ControlButton @click="() => relativeSeek(10)" icon="forward_10" />
      </div>
      <div class="col-auto">
        <volume-slider-button :setVolume="setVolume" :volume="volume" />
      </div>
    </div>

    <div class="gt-sm col-md-auto q-px-sm">
      <q-separator vertical class="full-height"/>
    </div>

    <div class="col-12 col-md-auto">
      <speed-control-button icon="speed" :options="speedOptions" :speed="speed" :setSpeed="setSpeed" options-hover-bg-color="blue-2" />
    </div>

  </div>
</template>

<style lang="scss" scoped>

</style>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { PlayerStatus } from 'src/composables/AudioPlayer'

import { symRoundedPlayArrow } from '@quasar/extras/material-symbols-rounded'

import ControlButton from 'src/components/Inputs/ControlButton.vue';
import VolumeSliderButton from 'src/components/Inputs/VolumeSliderButton.vue';
import SpeedControlButton from 'src/components/Inputs/SpeedControlButton.vue';

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
  return props.status === PlayerStatus.PLAYING ? 'sym_r_pause' : symRoundedPlayArrow
})

const speedOptions = computed(() => {
  return [
    { label: '0.5x', value: 0.5 },
    { label: '1x', value: 1 },
    { label: '1.5x', value: 1.5 },
    { label: '2x', value: 2 },
  ]
})
</script>