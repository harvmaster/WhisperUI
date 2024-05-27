<template>
  <div class="">

    <!-- Header -->
    <div class="col-12 row">
      <span class="col-12 q-px-md q-py-sm text-h6 text-weight-bold">{{ file.file.name }}</span>
      <div class="col-12">
        <q-separator/>
      </div>
    </div>

    <!-- Controls & Meta -->
    <div class="col-12 row justify-between q-col-gutter-y-md controls-section q-pa-md">
      <div class="col-12 col-md-auto row">
        <audio-file-controls
        :play="play" 
        :pause="pause" 
        :seek="seek" 
        :status="status" 
        :position="position"
        
        :volume="volume"
        :setVolume="setVolume"
        
        :speed="speed"
        :setSpeed="setSpeed"
        />
      </div>

      <div class="col-12 col-md-auto text-subtitle1 text-center self-center">
         <span class="text-blue-6">
           {{ timePosition }}
          </span>
          <span class="">
            / {{ timeDuration }}
          </span>
      </div>
      
      
      <div class="col-12 col-md-auto row">
        <div class="col-auto q-px-sm">
          <q-separator vertical class="full-height"/>
        </div>
        
        <search-input class="col-12 col-md-auto" v-model="searchInput" placeholder="Search" icon="search" />
        <div class="col-auto q-pl-sm">
          <control-button icon="delete" bg-color="red-2" text-color="red-5" @click="deleteFile"/>
        </div>
      </div>
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
.controls-section {
  font-size: 1.25em;
}
</style>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { app } from 'src/boot/app';
import AudioFile from 'src/core/AudioFile';

import useAudioPlayer from 'src/composables/useAudioPlayer';
import { numToLocaleTime } from 'src/lib/Time';

import AudioFileControls from './AudioFileControls.vue';
import SearchInput from '../Inputs/SearchInput.vue'
import ControlButton from '../Inputs/ControlButton.vue';
import deleteAudioFile from 'src/core/Database/audioFile/deleteAudioFile';

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
  volume,
  setVolume,
  speed,
  setSpeed,
} = useAudioPlayer(props.file.src)

const searchInput = ref('')

const timePosition = computed(() => {
  return numToLocaleTime(position.value)
})
const timeDuration = computed(() => {
  if (!props.file.audio) return '0:00'
  return numToLocaleTime(props.file.audio?.duration)
})

const deleteFile = () => {
  deleteAudioFile(props.file.id)
  app.files.value = app.files.value.filter(f => f.id !== props.file.id)
}
</script>