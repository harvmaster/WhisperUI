<template>
  <control-button
    icon="volume_up"
    @click="expand"
  >

    <template v-slot:after>
      <transition name="expand_x">
        <div v-if="expanded" class="volume-slider row self-center items-center q-pl-sm">
          <q-slider class="slider self-center col-12" v-model="volume" :min="0" :max="1" :step="0.01" />
        </div>
      </transition>
    </template>

  </control-button>

  <!-- <button class="volume-button row" @click="expand">
    <div class="col-12 row">

      icon
      <div class="col-auto">
        <q-icon class="volume-slider-icon" name="volume_up" />
      </div>

      volume slider
      <div v-if="expanded" class="volume-slider col-auto row" :class="{ 'active-slider': expanded }">
        <q-slider class="full-height" v-model="volume" min="0" max="1" step="0.01" />
      </div>
    </div>
  </button> -->
</template>

<style lang="scss" scoped>
.slider {
  height: 1em;
}
.volume-slider {
  height: 1em;
  width: 5em;
  transform: translateY(-50%);
}

.expand_x-enter-active, .expand_x-leave-active {
  transition: all 0.25s;
}
.expand_x-enter-from, .expand_x-leave-to {
  width: 0em;
  opacity: 0;
  padding: 0;
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
import ControlButton from './ControlButton.vue';

const volume = ref(0.5)

const expanded = ref(false)
const expand = () => {
  expanded.value = !expanded.value
}


</script>