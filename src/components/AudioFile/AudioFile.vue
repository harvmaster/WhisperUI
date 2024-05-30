<template>
  <div class="">

    <!-- Header -->
    <div class="col-12 row">
      <div class="col-12 row q-px-sm q-py-sm q-col-gutter-x-md">
        <div class="col-auto self-center">
          <q-btn flat round icon="chevron_left" @click="goBack" />
        </div>
        <span class="col text-h6 text-weight-bold ellipsis-2-lines self-center">{{ file.file.name }}</span>
      </div>
      <div class="col-12">
        <q-separator/>
      </div>
    </div>

    <!-- Controls & Meta -->
    <q-intersection
      class="desktop-only"
      @visibility="updateControls"
    >
      <div class="col-12 row justify-between q-col-gutter-y-md controls-section q-pa-md">
        <div class="col-12 col-md-auto row">
          <audio-file-controls
          :player="player"
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
        
        
        <div class="col-12 col-md-auto row q-col-gutter-sm">
          <div class="col-auto">
            <q-separator vertical class="full-height"/>
          </div>
          
          <div class="col-md-auto col-12">
            <search-input class="col-12 col-md-auto" v-model="searchInput" placeholder="Search" icon="search" />
          </div>
          <div class="col-auto">
            <control-button icon="delete" bg-color="red-2" text-color="red-5" @click="deleteFile"/>
          </div>
        </div>
      </div>
    </q-intersection>
      
    <!-- tracks -->
    <div class="col-12 row desktop-only">
      <div class="col-12 q-px-md">
        <audio-file-track-list :file="file" :player="player" />
      </div>
    </div>

    <!-- Dialog -->
    <div class="col-12">
      <transcript-container v-if="file.transcript" :transcript="file.transcript" />
    </div>

    <!-- Modal -->
    <control-modal :visible="showModal" :player="player" :file="file" />
    <div class="">
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
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import AudioFile from 'src/core/AudioFile';

import useAudioPlayer from 'src/composables/useAudioPlayer';
import { numToLocaleTime } from 'src/lib/Time';

import AudioFileControls from './AudioFileControls.vue';
import SearchInput from '../Inputs/SearchInput.vue'
import ControlButton from '../Inputs/ControlButton.vue';
import AudioFileTrackList from './AudioFileTrackList.vue';

import TranscriptContainer from '../Transcript/TranscriptContainer.vue';

import ControlModal from '../Controls/ControlModal.vue';

import deleteAudioFile from 'src/core/Database/audioFile/deleteAudioFile';

export type AudioFileProps = {
  file: AudioFile;
}

const props = defineProps<AudioFileProps>()

const $q = useQuasar()
const router = useRouter()

const player = useAudioPlayer(props.file.src)
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
} = player


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


const controlsVisible = ref(false)
const showModal = computed(() => {
  if ($q.platform.is.mobile) return true

 return !controlsVisible.value
})

const updateControls = (e: boolean) => {
  console.log(e)
  controlsVisible.value = e
}

const goBack = () => {
  router.go(-1)
}
</script>