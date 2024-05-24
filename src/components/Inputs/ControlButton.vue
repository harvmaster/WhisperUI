<template>
  <button class="control-button row" :style="buttonStyles" @click="onClick">
    <slot>
      <!-- Default slot content -->
      <div class="control-button-icon col-12 self-center row items-center">
        <Transition name="fade" mode="out-in">
          <q-icon class="col-12 self-center fit" :key="currentIcon" :name="currentIcon" />
        </Transition>
      </div>

    </slot>
  </button>
</template>

<style lang="scss" scoped>
.control-button {
  min-height: 0;
  height: fit-content;
  padding: 0.4em;
  border-radius: 25%;
  aspect-ratio: 1/1;
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

.control-button-icon {
  min-height: 0;
  height: fit-content;
  aspect-ratio: 1;
}
.control-button-icon .q-icon {
  font-size: 1.5em;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>

<script setup lang="ts">
import { computed } from 'vue';
import { colors } from 'quasar';

export type StatefulIcon = {
  icon: string;
  key: string;
}

export type StatefulControlButtonProps = {
  icon: StatefulIcon[];
  state?: string;
}

export type StaticControlButtonProps = {
  icon: string;
  state: never;
}

export type ControlButtonProps = (StatefulControlButtonProps | StaticControlButtonProps) & {
  textColor?: string;
  bgColor?: string;

  onClick: () => void;
}

const props = defineProps<ControlButtonProps>()

const currentIcon = computed(() => {
  if (Array.isArray(props.icon)) { // Would rather do if (props.state != undefined) but TS doesn't like that
    return props.icon.find((icon) => icon.key === props.state)?.icon || ''
  }
  return props.icon
})

const getColor = (color?: string) => color ? colors.getPaletteColor(color) : undefined
const buttonStyles = computed(() => {
  const bgColor = getColor(props.bgColor)
  
  const borderColor = bgColor ? colors.lighten(bgColor || '', -5) : '#454545'
  const border = `2px solid ${borderColor}`
  
  const backgroundColor = bgColor || 'transparent'
  const hoverBackgroundColor = bgColor ? colors.lighten(bgColor || '', -5) : '#e3e3e3'

  const textBlack = '#212121'
  const color = props.textColor || textBlack

  return {
    '--border': border,
    '--bg-color': backgroundColor,
    '--hover_bg-color': hoverBackgroundColor,
    '--color': color
  }
})
</script>