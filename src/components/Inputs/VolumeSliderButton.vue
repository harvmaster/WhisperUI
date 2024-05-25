<template>
  <button class="volume-button row" @click="expand">
    <div class="col-12 row">

      <!-- icon -->
      <div class="col-auto">
        <q-icon class="volume-slider-icon" />
      </div>

      <!-- volume slider -->
      <div v-if="expanded" class="volume-slider col-auto row" :class="{ 'active-slider': expanded }">
        <q-slider class="full-height" v-model="volume" min="0" max="1" step="0.01" />
      </div>
    </div>
  </button>
</template>

<style lang="scss" scoped>
.volume-button {
  min-height: 0;
  height: fit-content;
  padding: 0.4em;
  border-radius: 0.5em;
  // aspect-ratio: 1/1;
  cursor: pointer;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.1);

  color: var(--text-color);
  // border: var(--border);
  border: 1px solid #c7c7c7;
  background-color: var(--bg-color);

  transition: transform 0.25s, background-color 0.25s;
}

.volume-slider-icon {
  height: fit-content;
  aspect-ratio: 1;
  font-size: 1.5em;
}
</style>

<script setup lang="ts">
import { ref } from 'vue'

const volume = ref(0.5)

const expanded = ref(false)
const expand = () => {
  expanded.value = !expanded.value
}


</script>