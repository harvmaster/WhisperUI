<template>
  <div class="">
    <div class="row">
      <div class="col-12" style="height: 1em">
        <player-track v-if="file.audio?.duration" :position="position/file.audio?.duration" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script setup lang="ts">
import AudioFile from 'src/core/AudioFile';
import PlayerTrack from '../AudioTracks/PlayerTrack.vue'

export type AudioFileTrackListProps = {
  file: AudioFile;
  position: number;
}

const props = defineProps<AudioFileTrackListProps>()
</script>