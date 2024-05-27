<template>
  <div class="relative player-track-container">
    <div class="track-progress" :style="{ width: props.position*100 + '%' }" />
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
</style>

<script setup lang="ts">

export type PlayerTrackProps = {
  position: number;
}

const props = defineProps<PlayerTrackProps>()
</script>