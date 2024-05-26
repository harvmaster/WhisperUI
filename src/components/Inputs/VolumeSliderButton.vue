<template>
  <control-button
    :icon="volumeIcon"
    @click="expand"
  >

    <template v-slot:after>
      <transition name="expand_x">
        <div v-if="expanded" class="volume-slider self-center relative" @click.prevent.stop="() => {}">
          <div class="slider row items-center q-px-md">
            <q-slider class="" v-model="model" :min="0" :max="100" :step="1" label />
          </div>
        </div>
      </transition>
    </template>

  </control-button>
</template>

<style lang="scss" scoped>
.slider {
  // height: 100%;
  position: absolute;
  // top: 50%;
  transform: translateY(-50%);
  width: 100%;
}
.volume-slider {
  // height: 1em;
  height: 100%;
  width: 7em;
  // transform: translateY(-50%);
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
import { computed, ref, watch } from 'vue'
import ControlButton from './ControlButton.vue';

export type VolumeSliderButtonProps = {
  volume: number;
  setVolume: (volume: number) => void;
}

const props = defineProps<VolumeSliderButtonProps>()
const model = ref(props.volume)

watch(model, (value) => {
  props.setVolume(value)
})

const expanded = ref(false)
const expand = () => {
  expanded.value = !expanded.value
}

const volumeIcon = computed(() => {
  if (props.volume === 0) return 'volume_off'
  if (props.volume < 33) return 'volume_mute'
  if (props.volume < 66) return 'volume_down'
  return 'volume_up'
})

</script>