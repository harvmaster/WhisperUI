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
      <ControlButton @click="pause" icon="pause" bg-color="blue-3" />
      <ControlButton @click="pause" icon="pause" />
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script setup lang="ts">
import ControlButton from 'src/components/Inputs/ControlButton.vue';

export type AudioFileControlsProps = {
  play: () => void;
  pause: () => void;
  seek: (position: number) => void;

  volume: number;
  setVolume: (volume: number) => void;

  speed: number;
  setSpeed: (speed: number) => void;
}

const props = defineProps<AudioFileControlsProps>()
</script>