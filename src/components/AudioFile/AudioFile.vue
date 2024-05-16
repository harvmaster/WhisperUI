<template>
  <div class="">
    <div ref="audioFileContainer" class="q-pa-md audio-file-container pill full-width row">
      <div class="col-auto">
        <q-btn flat round dense icon="play_arrow" color="blue-4" @click="playAudio" />
      </div>

      <div class="col row">
        <!-- <audio-track /> -->
        <div v-for="i in 20" :key="i" class="col-auto audio-wave pill" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.audio-wave {
  width: 0.8em;
  height: 2em;
  background-color: red;
  margin-right: 0.25em;
}
</style>

<script setup lang="ts">
import { ref } from 'vue'

const audioFileContainer = ref<HTMLElement | null>(null)



</script>