<template>
  <div ref="trackElement" class="relative player-track-container" @mousedown="handleMouseDown" draggable="false">
    <div class="track-progress" :style="{ width: computedPosition }" :class="{ animate: !seeking.status }" />
  </div>
</template>

<style lang="scss" scoped>
.player-track-container {
  border-radius: 1000em;
  background-color: rgb(228, 228, 228);
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.track-progress {
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgb(134, 134, 134);
  border-radius: 1000em;
  height: 100%;
  min-width: 1em;
  // padding-top: 100%;

  &.animate {
    transition: width 0.1s;
  }
}
</style>

<script setup lang="ts">
import { ref, computed } from 'vue';

export type PlayerTrackProps = {
  position: number;
  onSeek?: (position: number) => void;
};

const props = defineProps<PlayerTrackProps>();

const trackElement = ref<HTMLElement | null>(null);
const seeking = ref({ status: false, playerPos: 0, position: 0, distance: 0 });

const computedPosition = computed(() => `${props.position * 100}%`);

const startSeeking = (event: MouseEvent) => {
  seeking.value = {
    status: true,
    playerPos: props.position,
    position: event.clientX,
    distance: 0
  };

  // Allow us to clean up the event listeners
  const abortController = new AbortController();
  
  // Prevent text selection
  event.preventDefault();
  event.stopPropagation();

  // Add event listeners
  document.addEventListener('mousemove', handleMouseMove, { signal: abortController.signal });
  document.addEventListener('mouseup', (event: MouseEvent) => endSeeking(event, abortController), { signal: abortController.signal });
};

const handleMouseMove = (event: MouseEvent) => {
  if (!seeking.value.status) return;

  const track = trackElement.value;
  if (!track) return;

  const offsetX = event.clientX - seeking.value.position;
  const newWidth = offsetX / track.offsetWidth;
  
  // This allows us to know if the user has dragged or clicked
  seeking.value.distance += Math.abs(offsetX);

  const position = Math.min(Math.max(seeking.value.playerPos + newWidth, 0), 1);
  props.onSeek?.(position);
};

const endSeeking = (event: MouseEvent, abortController: AbortController) => {
  // set position to the final position if the user hasnt dragged
  if (seeking.value.distance < 10) {
    const track = trackElement.value;
    if (!track) return;

    const position = event.offsetX / track.offsetWidth;
    props.onSeek?.(position);
  }
  
  // Reset seeking status
  seeking.value = { status: false, playerPos: 0, position: 0, distance: 0 };
  abortController.abort();
};

const handleMouseDown = (event: MouseEvent) => {
  if (!trackElement.value) return;

  const track = trackElement.value;
  const position = event.offsetX / track.offsetWidth;
  
  // If the user clicks instead of drags, we want to seek immediately
  setTimeout(() => {
    if (!props.onSeek) return;
    if (seeking.value.distance < 10) {
      props.onSeek(position);
      seeking.value = { status: true, playerPos: position, position: event.clientX, distance: 0 };
    }
  }, 200);

  startSeeking(event);
};
</script>
