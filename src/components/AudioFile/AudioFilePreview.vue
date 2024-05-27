<template>
  <div class="">
    <div class="row preview-container">

      <!-- Left side of preview -->
      <div class="col row">

        <!-- File Name -->
        <div class="col-12 text-h6 q-pa-md ellipsis">
          {{ file.file.name }}
        </div>

        <!-- Audio -->
        <div class="col-12 row track-container q-pa-sm">

          <!-- Play button -->
          <div class="col-auto self-center">
            <q-btn v-if="!isPlaying" flat dense round icon="play_arrow" color="blue-8" @click="play" />
            <q-btn v-else flat dense round icon="pause" color="blue-8" @click="pause" />
          </div>

          <!-- Track -->
          <div class="col row">
            <audio-track v-if="file.audio" class="col-12" :duration="file.audio?.duration" :waveform="file.audio?.waveform" :position="position" :seek="seek" />
          </div>

          <!-- position and duration -->
          <div class="col-auto self-center text-blue-4 text-subtitle1" :style="`min-width: ${durationWidth*2.2}px`">
            <span class="">
              {{ positionTime }} 
            </span>
            <span ref="durationElement">
              / {{ durationTime }}
            </span>
          </div>
        </div>
      </div>

      <!-- Go-to Button (right side of preview) -->
      <div class="col-auto row bg-blue-2">
        <div class="self-center fit">
          <q-btn class="fit q-pa-md" flat dense icon="arrow_forward_ios" color="blue-8" @click="routeToFile"/>
        </div>
      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.preview-container {
  border-radius: 1em;
  background-color: $blue-1;
  overflow: hidden;
}
.track-container {
  height: fit-content;
  background-color: $blue-2;
  border-radius: 1em 0 0 0;
}
.fit-width {
  width: fit-content;
}
</style>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router';
import { app } from 'src/boot/app';

import AudioFile from 'src/core/AudioFile';
import useAudioPlayer from 'src/composables/useAudioPlayer';
import { numToLocaleTime } from 'src/lib/Time';

import AudioTrack from './AudioTrack.vue'

export type AudioFileProps = {
  file: AudioFile;
}

const props = defineProps<AudioFileProps>()

const router = useRouter()

const {
  play,
  pause,
  seek,
  isPlaying,
  position,
} = useAudioPlayer(props.file.src)

const durationElement = ref<HTMLElement | null>(null)
const durationWidth = computed(() => {
  return durationElement.value?.clientWidth || 0
})

const positionTime = computed(() => {
  return numToLocaleTime(position.value)
})
const durationTime = computed(() => {
  return numToLocaleTime(props.file.audio?.duration || 0)
})

const routeToFile = () => {
  router.push(`/${props.file.id}`)
}
</script>