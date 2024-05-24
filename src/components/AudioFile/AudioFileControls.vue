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
        <ControlButton @click="() => toggleStatus()" icon="volume_up" />
      </div>
      <div class="col-auto">
        <ControlButton @click="toggleStatus" :icon="statusIcon" bg-color="blue-3" text-color="blue-9" />
      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>

</style>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { PlayerStatus } from 'src/composables/AudioPlayer'

import ControlButton from 'src/components/Inputs/ControlButton.vue';

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
</script>