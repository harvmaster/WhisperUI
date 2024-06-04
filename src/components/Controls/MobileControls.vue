<template>
  <div class="mobile-controls-container row" :class="{ visible }">
    <div class="mobile-controls row relative">
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
      

      <div class="col-12 row">

        <!-- Empty div to center next div -->
        <div class="col"></div>

        <!-- controls -->
        <div class="col-auto row justify-center">
          <div class="col-auto">
            <q-btn flat  size="1.5em" round :icon="roundFastRewind" @click="() => relativeSeek(-15)" />
          </div>
          <div class="col-auto">
            <q-btn class="bg-accent" size="1.5em" unelevated round :icon="statusIcon" @click="toggleStatus"/>
          </div>
          <div class="col-auto">
            <q-btn flat  size="1.5em" round :icon="roundFastForward" @click="() => relativeSeek(15)"/>
          </div>
        </div>

        <div class="col row justify-end items-center">
          <div class="col-auto">
            <q-btn class="" flat size="1em" round icon="more_vert">
              <q-menu class="bg-background" anchor="top middle" self="bottom middle" :offset="[0, 5]" transition-show="jump-up" transition-hide="jump-down">
                <div class="row">
                  <div class="col-12">
                    <q-btn class="square" flat size="0.75em" unelevated icon="delete" @click="deleteFile"/>
                  </div>
                </div>
              </q-menu>
            </q-btn>  
          </div>
        </div>
          

      </div>
      <!-- <div class="col-12 row">
        <div class="col-auto">
          <q-btn flat  size="1.5em" round icon="volume_up" />
        </div>
      </div> -->

      <!-- <div class="player-actions">
        <div class=""
      </div> -->
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
  opacity: 0;

  display: flex;
  flex-direction: row;
  justify-content: center;
  
  width: 100%;
  max-width: 100vw;
  padding: 0.5em;
  
  transition: all 0.5s;
}

.mobile-controls {
  padding: 2em;
  border-radius: 2em;

  width: var(--controls-width);
  background-color: var(--background-300);
}

.mobile-controls-container.visible {
  opacity: 1;
}
</style>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router';

import { roundPause, roundPlayArrow, roundFastForward, roundFastRewind } from '@quasar/extras/material-icons-round';

import PlayerTrack from '../AudioTracks/PlayerTrack.vue';
import AudioFile from 'src/core/AudioFile';

import { ControlledPlayer } from 'src/composables/useAudioPlayer';
import { numToLocaleTime } from 'src/lib/Time';
import { PlayerStatus } from 'src/composables/AudioPlayer';
import deleteAudioFile from 'src/core/Database/audioFile/deleteAudioFile';
import { app } from 'src/boot/app';

export type MobileControlsProps = {
  player: ControlledPlayer;
  file: AudioFile;
  visible: boolean;
}

const props = defineProps<MobileControlsProps>()
const router = useRouter()

const timePosition = computed(() => props.file.audio ? numToLocaleTime(props.player.position.value) : '0:00');
const timeDuration = computed(() => props.file.audio ? numToLocaleTime(props.file.audio.duration) : '0:00');

const handleSeek = (position: number) => {
  if (!props.file.audio) return;
  props.player.seek(position * props.file.audio?.duration);
}

const statusIcon = computed(() => props.player.status.value == PlayerStatus.PLAYING ? roundPause : roundPlayArrow);

const toggleStatus = () => {
  if (props.player.status.value == PlayerStatus.PLAYING) {
    props.player.pause();
  } else {
    props.player.play();
  }
}

const relativeSeek = (seconds: number) => {
  if (!props.file.audio) return;
  props.player.seek(props.player.position.value + seconds);
}

const deleteFile = async () => {
  if (!props.file.audio) return;
  props.player.pause();
  await deleteAudioFile(props.file.id);
  app.files.value = app.files.value.filter(file => file.id !== props.file.id);

  router.push('/');
}
</script>