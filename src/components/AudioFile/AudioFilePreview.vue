<template>
  <div class="">
    <div class="audio-file-container row" :style="containerStyle">

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

    </div>

  </div>
</template>

<style lang="scss" scoped>
.audio-wave {
  width: 0.8em;
  height: 2em; 
  background-color: $blue-4;
  margin-right: 0.25em;
}

.audio-file-container {
  width: 100%;
  background-color: $blue-1;
  box-shadow: 0 0.1rem 1rem rgba(0, 0, 0, 0.1);

}

.audio-file-header {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  transform: translateY(100%);

  transition: transform 0.5s;

  background-color: $blue-2;
  box-shadow: 0 0.1rem 1rem rgba(0, 0, 0, 0.1);
}

.audio-file-body {
  overflow: hidden;
  width: 100%;
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