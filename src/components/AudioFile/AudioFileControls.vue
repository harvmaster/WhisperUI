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
      <ControlButton @click="changeIcon" :icon="icon" />
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script setup lang="ts">
import { ref } from 'vue'
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

const icon = ref('pause')
const changeIcon = () => {
  console.log('icon', icon.value)
  icon.value = icon.value === 'play_arrow' ? 'pause' : 'play_arrow'
}
</script>