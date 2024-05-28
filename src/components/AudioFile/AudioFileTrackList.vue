<template>
  <div class="">
    <div class="row">
      <div class="col-12" style="height: 1em">
        <player-track v-if="file.audio?.duration" :position="player.position.value/file.audio?.duration" :on-seek="handleSeek" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script setup lang="ts">
import AudioFile from 'src/core/AudioFile';
import PlayerTrack from '../AudioTracks/PlayerTrack.vue'
import { ControlledPlayer } from 'src/composables/useAudioPlayer';

export type AudioFileTrackListProps = {
  file: AudioFile;
  player: ControlledPlayer;
}

const props = defineProps<AudioFileTrackListProps>()

const handleSeek = (position: number) => {
  if (!props.file.audio) return;
  props.player.seek(position * props.file.audio?.duration);
}
</script>