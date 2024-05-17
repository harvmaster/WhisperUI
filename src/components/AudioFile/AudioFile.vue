<template>
  <div class="">
    <div class="audio-file-container row" :style="containerStyle">

      <!-- file name -->
      <div class="col-12 fit-height relative text-h6 q-px-md row" :style="fileNameHeight">
        <span class="col-12 self-center">
          My File Name
        </span>
        <!-- Header -->
        <div ref="audioFileHeader" class="audio-file-header q-pa-md pill col-12 row" :style="`transform: translateY(${expanded ? '0' : '100%'});`">
          <div class="col-auto q-pr-md">
            <q-btn v-if="!isPlaying" flat round dense icon="play_arrow" color="blue-4" @click="play" />
            <q-btn v-else flat round dense icon="pause" color="blue-4" @click="pause" />
          </div>
  
          <div class="col row">
            <audio-track class="col-12" :duration="audio.duration" :waveform="audio.waveform" :position="position" :seek="seek" />
          </div>

          <div class="col-auto">
            <span class="text-blue-4 text-subtitle1">
              {{ 
                Math.floor(position / 60)
              }}:{{ 
                Math.floor(position % 60) < 10 ? '0' : '' 
              }}{{ 
                Math.floor(position % 60)
              }}
              /
              {{ 
                Math.floor(audio.duration / 60)
              }}:{{
                Math.floor(audio.duration % 60) < 10 ? '0' : ''
              }}{{
                Math.floor(audio.duration % 60)
              }}
            </span>
          </div>
  
          <div class="col-auto">
            <q-btn v-if="!expanded" flat round dense icon="keyboard_arrow_down" color="blue-4" @click="expand" />
            <q-btn v-else flat round dense icon="keyboard_arrow_up" color="blue-4" @click="collapse" />
          </div>
        </div>
      </div>

      <div ref="audioFileContent" class="col-12 row overflow-hidden animate-height" :style="!expanded ? fileNameHeight : audioFileContentHeight">
        <div class="col-12 q-px-md row" :style="fileNameHeight">
          <span class="col-12 self-center text-grey-10">
            <span class="text-grey-9 text-weight-medium text-h6 ">
              {{ file.name }}
            </span>
            <span class="text-caption">
              ({{ (file.size/1024/1024).toPrecision(2) }} MB)
            </span>
          </span>
        </div>

        <div class="col-12 q-px-md">
          <q-separator />
        </div>

        <div class="col-12 text-h6 text-grey-9 q-pa-md">
          A really long string of text that will be hidden when the file is collapsed. There should be a button to expand the file and show this text.
        
        </div>
      </div>


      <!-- Body -->
      <!-- <transition name="shrink-y">
        <div v-if="expanded" class="audio-file-body col-12">
          <div class="fit-width row">
            <div class="col-auto">
              <q-icon name="description" class="self-center full-height" />
            </div>
            <div class="col">
              <div class="text-h6 text-weight-medium">
                File Name
              </div>
              <div class="text-h6">
                My file name
              </div>
            </div>
          </div>
        </div>
      </transition> -->

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

.animate-height {
  transition: height 0.5s;
}
</style>

<script setup lang="ts">
import { computed, ref } from 'vue'

import useAudioPlayer from 'src/composables/useAudioPlayer';

import AudioTrack from './AudioTrack.vue'
import { UploadedAudioFile } from 'src/boot/app';

export type AudioFileProps = UploadedAudioFile & {
  src: string
}

const props = defineProps<AudioFileProps>()

console.log(props)

const {
  play,
  pause,
  seek,
  isActive,
  isPlaying,
  status,
  position,
} = useAudioPlayer(props.url)

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

const audioFileContentHeight = computed(() => {
  // get height including the hidden elements
  let audioFileHeight = headerHeight.value
  if (audioFileContent.value) {
    let childrenHeight = 0;
    for (let i = 0; i < audioFileContent.value.children.length; i++) {
      console.log(i, audioFileContent.value.children[i])
      console.log(audioFileContent.value.children[i].clientHeight)
      childrenHeight += audioFileContent.value.children[i].clientHeight
    }
    audioFileHeight = childrenHeight
  }

  return {
    height: `${audioFileHeight}px`
  }
})

const containerStyle = computed(() => {
  return {
    borderRadius: `${headerHeight.value/2}px`,
    minHeight: `${headerHeight.value*2}px`
  }
})

const expanded = ref(false)
const expand = () => {
  expanded.value = true
}
const collapse = () => {
  expanded.value = false
}
</script>