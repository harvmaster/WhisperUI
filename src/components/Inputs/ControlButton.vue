<template>
  <button class="control-button relative" :style="buttonStyles" @click="emitClick">
    <slot>
      <!-- Default slot content -->
      <div class="control-button-icon self-center row items-center">
        <Transition name="fade" mode="out-in">
          <q-icon class="col-12 self-center button-icon" size="1.5em" :key="currentIcon" :name="currentIcon" :style="`color: ${buttonStyles['--color']}`"/>
        </Transition>
      </div>

    </slot>
    <slot name="after">

    </slot>
  </button>
</template>

<style lang="scss" scoped>
.control-button {
  min-height: 0;
  height: fit-content;
  padding: 0.4em;
  border-radius: 0.5em;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: row;
  cursor: pointer;

  color: var(--text-color);
  border: var(--border);
  background-color: var(--bg-color);

  transition: transform 0.25s, background-color 0.25s;
}
.control-button:hover {
  background-color: var(--hover_bg-color);
}
.control-button:active {
  transform: scale(0.95);
}

.button-icon {
  height: 1em;
  width: 1em;
}
.button-icon svg {
  transform: scale(2);
}

.control-button-icon {
  min-height: 0;
  height: fit-content;
  aspect-ratio: 1;
}
.control-button-icon .q-icon {
  font-size: 1.5em;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.15s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>

<script setup lang="ts">
import { computed } from 'vue';
import { colors } from 'quasar';

export type ControlButtonProps = {
  icon?: string;
  textColor?: string;
  bgColor?: string;
  hoverBgColor?: string;
}

const props = defineProps<ControlButtonProps>()
const emit = defineEmits(['click'])

const currentIcon = computed(() => {
  return props.icon
})

const getColor = (color?: string) => color ? colors.getPaletteColor(color) : undefined

const buttonStyles = computed(() => {
  const bgColor = getColor(props.bgColor)
  
  const borderColor = bgColor ? colors.lighten(bgColor || '', -5) : '#c7c7c7'
  const border = `1px solid ${borderColor}`
  
  const backgroundColor = bgColor || 'transparent'
  const hoverBackgroundColor = getColor(props.hoverBgColor) || (bgColor ? colors.lighten(bgColor || '', -5) : '#e3e3e3')

  const textBlack = '#5a5a5a'
  const color = getColor(props.textColor) || textBlack

  return {
    '--border': border,
    '--bg-color': backgroundColor,
    '--hover_bg-color': hoverBackgroundColor,
    '--color': color
  }
})

const emitClick = () => {
  emit('click')
}
</script>