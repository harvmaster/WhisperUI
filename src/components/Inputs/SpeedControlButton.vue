<template>
  <control-button
    :icon="icon"
    @click="expand"
  >
    <template v-slot:default>
      <div class="col-12 row self-center label-container">
        <span class="col-auto text-weight-bold q-px-sm">{{ speed?.toPrecision(1) }}x</span>
        <div class="col-auto row items-center label-icon">
          <q-icon name="expand_more" />
        </div>
      </div>
    </template>

    <template v-slot:after>
      <transition name="fade">
        <div v-if="expanded" class="row absolute-bottom options-container" :style="optionStyles">
          <div class="col-12 option" v-for="option in options" :key="option.value" @click="() => setSpeed(option.value)">
            {{ option.label }}
          </div>
        </div>
      </transition>
    </template>
  </control-button>
</template>

<style lang="scss" scoped>
.label-container {
  height: 1.5em;
}
.label-icon {
  font-size: 1.5em;
}

.options-container {
  width: fit-content;
  background-color: var(--option-bg-color);
  border: var(--border);
  border-radius: 0.5em;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.1);
  z-index: 100;
  transform: translateY(100%);
}
.option {
  cursor: pointer;
  padding-right: 0.5em;
  padding-left: 0.5em;

  &:hover {
    background-color: var(--option-hover_bg-color);
  }
}
</style>

<script setup lang="ts">
import { computed, ref } from 'vue';
import ControlButton, { ControlButtonProps } from './ControlButton.vue';
import { colors } from 'quasar';

export type SpeedOption = {
  value: number;
  label: string;
}

export type SpeedControlButtonProps = ControlButtonProps & {
  options: SpeedOption[];
  speed: number;
  setSpeed: (speed: number) => void;

  optionsBgColor?: string;
  optionsHoverBgColor?: string;
}

const props = defineProps<SpeedControlButtonProps>()

const expanded = ref(false)
const expand = () => {
  expanded.value = !expanded.value
}

const getColor = (color?: string) => color ? colors.getPaletteColor(color) : undefined

const optionStyles = computed(() => {
  const bgColor = getColor(props.optionsBgColor)
  const hoverBgColor = getColor(props.optionsHoverBgColor)

  return {
    '--option-bg-color': bgColor || 'white',
    '--option-hover_bg-color': hoverBgColor || 'lightgray',
  }
})
</script>