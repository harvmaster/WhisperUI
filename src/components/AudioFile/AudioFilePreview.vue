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

          <div class="col-auto self-center">
            <span class="text-blue-4 text-subtitle1">
              {{ positionTime }} / {{ durationTime }}
            </span>
          </div>
        </div>
      </div>

      <!-- Go-to Button (right side of preview) -->
      <div class="col-auto row bg-blue-2">
        <div class="self-center fit">
          <q-btn class="fit q-pa-md" flat dense icon="arrow_forward_ios" color="blue-8" />
        </div>
      </div>
    </div>

    <!-- <div class="audio-file-container row" :style="containerStyle">

      <div class="col-12 fit-height relative text-h6 q-pa-md row" :style="fileNameHeight">
        <span class="col self-center ellipsis">
          {{ file.file.name }}
        </span>
        <div class="col-auto self-center">
          <q-btn flat dense round icon="delete" color="blue-8" @click="deleteFile" />
        </div>

        <div ref="audioFileHeader" class="audio-file-header q-pa-md pill col-12 row">
          <div class="col-auto q-pr-md">
            <q-btn v-if="!isPlaying" flat round dense icon="play_arrow" color="blue-4" @click="play" />
            <q-btn v-else flat round dense icon="pause" color="blue-4" @click="pause" />
          </div>
  
          <div class="col row">
            <audio-track v-if="file.audio" class="col-12" :duration="file.audio?.duration" :waveform="file.audio?.waveform" :position="position" :seek="seek" />
          </div>

          <div class="col-auto">
            <span class="text-blue-4 text-subtitle1">
              {{ positionTime }} / {{ durationTime }}
            </span>
          </div>
  
        </div>

        <div class="col-auto">
          <q-btn v-if="!expanded" flat round dense icon="keyboard_arrow_down" color="blue-4" @click="expand" />
          <q-btn v-else flat round dense icon="keyboard_arrow_up" color="blue-4" @click="collapse" />
        </div>
      </div>

    </div> -->

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
</style>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { app } from 'src/boot/app';
import AudioFile from 'src/core/AudioFile';

import AudioTrack from './AudioTrack.vue'
import useAudioPlayer from 'src/composables/useAudioPlayer';

import deleteAudioFile from 'src/core/Database/audioFile/deleteAudioFile'
import { numToLocaleTime } from 'src/lib/Time';

export type AudioFileProps = {
  file: AudioFile;
}

const props = defineProps<AudioFileProps>()

console.log('Audio File Id: ', props.file.id)
console.log('Audio file loading: ', props.file.loading)
console.log('Audio File url: ', props.file.src)

const transcript = computed(() => {
  return props.file.transcript
})

const {
  play,
  pause,
  seek,
  isActive,
  isPlaying,
  status,
  position,
} = useAudioPlayer(props.file.src)

const audioFileHeader = ref<HTMLElement | null>(null)
const audioFileContent = ref<HTMLElement | null>(null)

const headerHeight = computed(() => {
  return audioFileHeader.value ? audioFileHeader.value.clientHeight : 0
})

const fileNameHeight = computed(() => {
  return {
    height: `${headerHeight.value}px`
  }
})

const containerStyle = computed(() => {
  return {
    borderRadius: `${headerHeight.value/2}px`,
    minHeight: `${headerHeight.value*2}px`
  }
})

const positionTime = computed(() => {
  return numToLocaleTime(position.value)
})
const durationTime = computed(() => {
  return numToLocaleTime(props.file.audio?.duration || 0)
})

const deleteFile = () => {
  app.files.value.splice(app.files.value.findIndex(file => file.id === props.file.id), 1)
  deleteAudioFile(props.file.id)
}
</script>