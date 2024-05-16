<template>
  <div class="">
    <div class="audio-file-container row" :style="containerStyle">

      <!-- file name -->
      <span class="col-12 fit-height relative text-h6 q-px-md row" :style="fileNameHeight">
        <span class="col-12 self-center">
          My File Name
        </span>
        <!-- Header -->
        <div ref="audioFileHeader" class="audio-file-header q-pa-md pill col-12 row" :style="`transform: translateY(${expanded ? '0' : '100%'});`">
          <div class="col-auto q-pr-md">
            <q-btn flat round dense icon="play_arrow" color="blue-4" @click="playAudio" />
          </div>
  
          <div class="col row">
            <audio-track class="col-12" />
          </div>
  
          <div class="col-auto">
            <q-btn v-if="!expanded" flat round dense icon="keyboard_arrow_down" color="blue-4" @click="expand" />
            <q-btn v-else flat round dense icon="keyboard_arrow_up" color="blue-4" @click="collapse" />
          </div>
        </div>
      </span>


      <!-- Body -->
      <transition name="shrink-y">
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
      </transition>

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

.shrink-y-enter-active, .shrink-y-leave-active {
  transition: max-height 0.5s;
}

.shrink-y-enter-from, .shrink-y-leave-to {
  max-height: 0;
}

.shrink-y-enter-to, .shrink-y-leave-from {
  max-height: 250px;
}

</style>

<script setup lang="ts">
import { computed, ref } from 'vue'
import AudioTrack from './AudioTrack.vue'

const audioFileHeader = ref<HTMLElement | null>(null)

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

const expanded = ref(false)
const expand = () => {
  expanded.value = true
}
const collapse = () => {
  expanded.value = false
}

</script>