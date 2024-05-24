<template>
  <div class="">

    <!-- Header -->
    <div class="col-12 row">
      <span class="col-12 text-h6 text-weight-bold">{{ file.file.name }}</span>
    </div>

    <!-- Controls & Meta -->
    <div class="col-12 row">
      <audio-file-controls class="col-12" :play="play" :pause="pause" :seek="seek" />
    </div>

    <!-- tracks -->
    <div class="col-12 row">

    </div>

    <!-- Dialog -->
    <div class="col-12">

    </div>

  </div>
</template>

<style lang="scss" scoped>

</style>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { app } from 'src/boot/app';
import AudioFile from 'src/core/AudioFile';

import useAudioPlayer from 'src/composables/useAudioPlayer';

import AudioFileControls from './AudioFileControls.vue';

export type AudioFileProps = {
  file: AudioFile;
}

const props = defineProps<AudioFileProps>()

const {
  play,
  pause,
  seek,
  isActive,
  isPlaying,
  status,
  position,
} = useAudioPlayer(props.file.src)


</script>