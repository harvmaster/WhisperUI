<template>
  <control-button
    :icon="volumeIcon"
    @click="expand"
  >

    <template v-slot:after>
      <transition name="expand_x">
        <div v-if="expanded" class="volume-slider row self-center items-center q-px-sm" @click.prevent.stop="() => {}"> 
          <q-slider class="slider self-center col-12" v-model="volume" :min="0" :max="100" :step="1" label />
        </div>
      </transition>
    </template>

  </control-button>
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
import { computed, ref } from 'vue'
import ControlButton from './ControlButton.vue';

const volume = ref(50)

const expanded = ref(false)
const expand = () => {
  expanded.value = !expanded.value
}

const volumeIcon = computed(() => {
  if (volume.value === 0) return 'volume_off'
  if (volume.value < 33) return 'volume_mute'
  if (volume.value < 66) return 'volume_down'
  return 'volume_up'
})

</script>