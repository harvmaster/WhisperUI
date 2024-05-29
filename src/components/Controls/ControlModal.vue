<template>
  <div class="control-modal row">
    <div class="col">
    </div>

    <div class="col-auto row q-col-gutter-x-sm items-end relative">

      <div class="col-auto">
        <control-button icon="replay_10" bg-color="blue-3" text-color="blue-6" />
      </div>

      <div class="col-auto row">
       {{ positionTime }} / {{ durationTime }}
      </div>
      
      <div class="col-auto">
        <control-button icon="forward_10" bg-color="blue-3" text-color="blue-6" />
      </div>

      <div class="play-button">
        <control-button class="" :icon="statusIcon" bg-color="blue-3" text-color="blue-6" />
      </div>
    </div>

    <div class="col">
    </div>
  </div>
</template>

<style lang="scss" scoped>
.control-modal {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 1);
  z-index: 1000;
  padding: 1em;
  display: flex;
  justify-content: center;
  box-shadow: 0px -2px 5px rgba(0, 0, 0, 0.5);
  // background-color: white;
}
.play-button {
  // font-size: 2em;
  // height: 2em;
  // width: 2em;
  font-size: 1.25em;
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateY(-100%) translateX(-50%);
  border-radius: 0.5em;
  // box-shadow: 0px 0px 1px 2px $blue-6;
}
</style>

<script setup lang="ts">
import { ControlledPlayer } from 'src/composables/useAudioPlayer';
import AudioFile from 'src/core/AudioFile';
import ControlButton from '../Inputs/ControlButton.vue';

import { numToLocaleTime } from 'src/lib/Time';
import { computed } from 'vue';
import { PlayerStatus } from 'src/composables/AudioPlayer';
import { symRoundedPause, symRoundedPlayArrow } from '@quasar/extras/material-symbols-rounded';


export type ControlModalProps = {
  visible: boolean;
  player: ControlledPlayer;
  file: AudioFile;
};

const props = defineProps<ControlModalProps>();

const positionTime = computed(() => numToLocaleTime(props.player.position.value));
const durationTime = computed(() => numToLocaleTime(props.file.audio?.duration || 0));

const statusIcon = computed(() => {
  return props.player.status.value === PlayerStatus.PLAYING ? symRoundedPause : symRoundedPlayArrow
})
</script>