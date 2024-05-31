<template>
  <div class="mobile-controls-container row" :class="{ visible }">
    <div class="mobile-controls row">
      <div class="col-12 row">
        
        <player-track 
        class="col-12"
        style="height: 0.5em"
        
        v-if="file.audio?.duration"
        :position="player.position.value/file.audio?.duration"
        :on-seek="handleSeek"
        />
        
        <div class="col-12 row justify-between">
          <div class="col-auto">
            {{ timePosition }}
          </div>
          <div class="col-auto">
            {{ timeDuration }}
          </div>
        </div>
      </div>
      
      <div class="col-12 row justify-center">
        <div class="col-auto">
          <q-btn flat  size="1.5em" round icon="skip_previous" />
        </div>
        <div class="col-auto">
          <q-btn class="bg-accent" size="1.5em" unelevated round :icon="statusIcon" />
        </div>
        <div class="col-auto">
          <q-btn flat  size="1.5em" round icon="skip_next" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.mobile-controls-container {
  --translate-x: 0%;
  --translate-y: 0%;
  --controls-width: 100vw;
}

@media screen and (min-width: 600px) {
  .mobile-controls-container {
    --translate-x : -50%;
    --translate-y: 0%;
    --controls-width: 30em;
  }
}

.mobile-controls-container {
  position: sticky;
  bottom: 0%;
  left: 50%;
  transform: translateY(100%) translateX(var(--translate-x));
  opacity: 0;
  
  width: var(--controls-width);
  max-width: 100vw;
  padding: 0.5em;
  
  transition: all 0.5s;
}

.mobile-controls {
  width: 100%;
  border-radius: 2em;
  background-color: var(--background-200);
  // border: 1px solid #e1e1e1;
  padding: 2em;
}

.mobile-controls-container.visible {
  transform: translateY(var(--translate-y)) translateX(var(--translate-x));
  opacity: 1;
}
</style>

<script setup lang="ts">
import { computed } from 'vue'
import { symRoundedPlayArrow, symRoundedPauseCircle } from '@quasar/extras/material-symbols-rounded';
import { roundPause, roundPlayArrow } from '@quasar/extras/material-icons-round';

import PlayerTrack from '../AudioTracks/PlayerTrack.vue';
import AudioFile from 'src/core/AudioFile';

import { ControlledPlayer } from 'src/composables/useAudioPlayer';
import { numToLocaleTime } from 'src/lib/Time';
import { PlayerStatus } from 'src/composables/AudioPlayer';

export type MobileControlsProps = {
  player: ControlledPlayer;
  file: AudioFile;
  visible: boolean;
}

const props = defineProps<MobileControlsProps>()

const timePosition = computed(() => props.file.audio ? numToLocaleTime(props.player.position.value) : '0:00');
const timeDuration = computed(() => props.file.audio ? numToLocaleTime(props.file.audio.duration) : '0:00');

const handleSeek = (position: number) => {
  if (!props.file.audio) return;
  props.player.seek(position * props.file.audio?.duration);
}

const statusIcon = computed(() => props.player.status.value == PlayerStatus.PLAYING ? roundPause : roundPlayArrow);
</script>