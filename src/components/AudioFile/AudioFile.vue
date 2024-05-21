<template>
  <div class="">
    <div class="audio-file-container row" :style="containerStyle">

      <!-- file name -->
      <div class="col-12 fit-height relative text-h6 q-pa-md row" :style="fileNameHeight">
        <span class="col self-center">
          {{ file.file.name }}
        </span>
        <div class="col-auto self-center">
          <q-btn flat dense round icon="delete" color="blue-8" @click="deleteFile" />
        </div>
        <!-- Header -->
        <div ref="audioFileHeader" class="audio-file-header q-pa-md pill col-12 row" :style="`transform: translateY(${expanded ? '0' : '100%'});`">
          <div class="col-auto q-pr-md">
            <q-btn v-if="!isPlaying" flat round dense icon="play_arrow" color="blue-4" @click="play" />
            <q-btn v-else flat round dense icon="pause" color="blue-4" @click="pause" />
          </div>
  
          <div class="col row">
            <audio-track v-if="file.audio" class="col-12" :duration="file.audio?.duration" :waveform="file.audio?.waveform" :position="position" :seek="seek" />
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
                Math.floor((file.audio?.duration || 0) / 60)
              }}:{{
                Math.floor((file.audio?.duration || 0) % 60) < 10 ? '0' : ''
              }}{{
                Math.floor((file.audio?.duration || 0) % 60)
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
              {{ file.file.name }}
            </span>
            <span class="text-caption">
              ({{ (file.file.size/1024/1024).toPrecision(2) }} MB)
            </span>
          </span>
        </div>

        <div class="col-12 q-px-md">
          <q-separator />
        </div>

        <div v-if="transcript" class="col-12 text-h6 text-grey-9 q-pa-md" style="max-height: 10em; overflow: auto;">
          <div class="col-12 row" v-for="line in transcript.segments" :key="line.id">
            <div 
                v-for="word in line.words" :key="word.start" 
                class="col-auto"
                :class="[
                  position >= word.start && 'transcribed-word-active',
                  position > word.end && 'transcribed-word-finished'
                ].join(' ')" 
                @click="() => seek(word.start)"
              >
              <span class="transcribed-word q-pa-xs">
                {{ word.word }}
                <div class="transcribed-word-videtime">
                  {{ 
                    Math.floor(word.start / 60)
                  }}:{{ 
                    Math.floor(word.start % 60) < 10 ? '0' : '' 
                  }}{{ 
                    Math.floor(word.start % 60)
                  }}
                </div>
              </span>
              <div class="col-auto q-px-xs">
            </div>

            </div>
          </div>
          <!-- A really long string of text that will be hidden when the file is collapsed. There should be a button to expand the file and show this text. -->
        
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

.animate-height {
  transition: height 0.5s;
}

.transcribed-word {
  cursor: pointer;
  --show-videotime: hidden;
  position: relative;
}
.transcribed-word:hover {
  text-decoration: underline;
  background-color: $blue-3;
  --show-videotime: visible;
}
.transcribed-word-active {
  background-color: $blue-3;
}
.transcribed-word-finished {
  background-color: $blue-2;
}
.transcribed-word-videtime {
  position: absolute;
  bottom: 0;
  left: 0;

  width: 100%;
  text-align: center;
  transform: translate(0%, 100%);
  line-height: 0;
  color: $grey-7;
  font-size: 0.5em;
  visibility: var(--show-videotime);
}
</style>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { app } from 'src/boot/app';
import AudioFile from 'src/core/AudioFile';

import AudioTrack from './AudioTrack.vue'
import useAudioPlayer from 'src/composables/useAudioPlayer';

import deleteAudioFile from 'src/core/Database/audioFile/deleteAudioFile'

export type AudioFileProps = {
  file: AudioFile;
}

const props = defineProps<AudioFileProps>()

console.log('Audio File Id: ', props.file.id)
console.log('Audio file loading: ', props.file.loading)
console.log('Audio File url: ', props.file.src)
// console.log(exampleTranscript)

// const transcript = ref(exampleTranscript)
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

const audioFileContentHeight = computed(() => {
  // get height including the hidden elements
  const transcript = props.file.transcript
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
  keepInSight()
  setTimeout(keepInSight, 100)
  setTimeout(keepInSight, 300)
  setTimeout(keepInSight, 500)
}
const collapse = () => {
  expanded.value = false
}

const keepInSight = () => {
  if (audioFileContent.value) {
    audioFileContent.value.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const deleteFile = () => {
  console.log('deleting file', props.file.id)

  app.files.value.splice(app.files.value.findIndex(file => file.id === props.file.id), 1)
  deleteAudioFile(props.file.id)
}
</script>