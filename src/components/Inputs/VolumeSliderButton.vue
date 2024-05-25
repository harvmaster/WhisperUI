<template>
  <button class="control-button row relative" :style="buttonStyles" @click="onClick">
    <div class="col-12 row">

      <!-- icon -->
      <div class="col-auto">
        <q-icon class="volume-slider-icon" />
      </div>

      <!-- volume slider -->
      <div v-if="expanded" class="volume-slider col-auto row" :class="{ 'active-slider': expanded }">
        <q-slider v-model="volume" min="0" max="1" step="0.01" />
      </div>
    </div>
  </button>
</template>

<style lang="scss" scoped>
.volume-slider-icon {
  height: fit-content;
  aspect-ratio: 1;
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
import controlButton from 'src/components/Inputs/ControlButton.vue'

const volume = ref(0.5)

const expanded = ref(false)
const expand = () => {
  expanded.value = !expanded.value
}


</script>