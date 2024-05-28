<template>
  <div ref="trackElement" class="relative player-track-container" @mousedown="handleMouseDown">
    <div class="track-progress" :style="{ width: props.position*100 + '%' }" :class="!seeking.status && `animate`"/>
  </div>
</template>

<style lang="scss" scoped>
.player-track-container {
  border-radius: 1000em;
  background-color: rgb(228, 228, 228);
  height: 100%;
  width: 100%;
}

.track-progress {
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgb(134, 134, 134);
  border-radius: 1000em;
  height: 100%;
}

.animate {
  transition: width 0.1s;
}
</style>

<script setup lang="ts">
import { ref } from 'vue';


export type PlayerTrackProps = {
  position: number;
  onSeek?: (position: number) => void;
}

const props = defineProps<PlayerTrackProps>()

const trackElement = ref<HTMLElement | null>(null)

const seeking = ref({
  status: false,
  playerPos: 0,
  position: 0
})

const seekTo = (event: MouseEvent) => {
  const track = trackElement.value;
  if (!track) return;

  const totalMoved = event.clientX - seeking.value.position;
  const diff = totalMoved / track.offsetWidth

  const position = Math.max(Math.min(diff + seeking.value.playerPos, 1), 0);
  props.onSeek?.(position);
}

const abortController = ref<AbortController | null>(null)
const handleMouseDown = (event: MouseEvent) => {
  startSeek(event);
  const startingPos = props.position
  setTimeout(() => {
    if (!props.onSeek) return;
    const track = trackElement.value;
    if (!track) return; 
    const position = event.offsetX / track.offsetWidth;
    if (props.position - startingPos < 0.05 && props.position - startingPos > -0.05) {
      
      props.onSeek(position);
      seeking.value = {
        status: true,
        playerPos: position,
        position: event.clientX
      }
    }
  }, 200);
}

const startSeek = (event: MouseEvent) => {
  if (abortController.value !== null) {
    abortController.value.abort()
  }
  seeking.value = {
    status: true,
    playerPos: props.position,
    position: event.clientX
  }

  abortController.value = new AbortController()

  document.addEventListener('mouseup', (event: Event) => endSeek(event), { signal: abortController.value.signal })
  document.addEventListener('mousemove', (event: Event) => handleMove(event), { signal: abortController.value.signal })
}
const endSeek = (event: Event) => {
  seeking.value = {
    status: false,
    playerPos: 0,
    position: 0
  }
  abortController.value?.abort()
}

const handleMove = (event: Event) => {
  if (!seeking.value) return;
  if (event.type !== 'mousemove') return
  seekTo(event as MouseEvent);
}
</script>