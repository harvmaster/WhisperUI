<template>
  <q-page class="row justify-center">
    <!-- Desktop -->

    <!-- Mobile -->
    <div class="col-12 column">

      <!-- Transcript -->
      <div class="col full-width row justify-center mobile-transcript-container">

        <!-- Im not sure why I need this div, but without it, the border-radius and overflow: hidden dont work -->
        <div class="col-12 fit secondary-transcript-container">
          <q-scroll-area class="fit bg-primary">
            <div v-if="file && file.loading" class="col-12 row justify-center q-pa-md">
              <div class="col-12 text-center text-h6 text-muted" style="font-weight: 800">
                Transcribing...
              </div>
              <q-spinner-dots color="blue-8" size="2em"/>
            </div>

            <q-intersection>
              <TranscriptContainer v-if="file && file.transcript" :transcript="file.transcript" :position="position" :set-position="seek"/>
            </q-intersection>
          </q-scroll-area>
        </div>
      </div>

      <!-- Controls -->
      <div class="col-auto q-pb-lg mobile-controls-container" v-if="file">
        <mobile-controls :player="player" :file="file" :visible="true"/>
      </div>
    </div>


    <!-- <div class="col-12 col-md-8">
      <audio-file class="file-container" v-if="file" :file="file" />
    </div> -->
  </q-page>
</template>

<style lang="scss" scoped>
.file-container {
  border-radius: 2em;

}

.mobile-transcript-container {
  border-radius: 2em;
  padding: 0.5em;
  overflow: hidden;
}

.secondary-transcript-container {
  max-width: 50em;
  border-radius: 2em;
  overflow: hidden;
}
</style>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { app } from 'boot/app'

import AudioFile from 'components/AudioFile/AudioFile.vue'

import MobileControls from 'src/components/Controls/MobileControls.vue'
import TranscriptContainer from 'src/components/Transcript/TranscriptContainer.vue';
import useAudioPlayer from 'src/composables/useAudioPlayer';

const router = useRouter()

const file = computed(() => {
  const id = router.currentRoute.value.params.id
  return app.files.value.find(file => file.id === id)
})

const player = useAudioPlayer(file.value?.src)

const {
  position,
  seek
} = player

watch(file, () => {
  if (!file.value) router.push('/')
  app.layoutHeader.value = file.value?.file.name || 'File'
})

onMounted(() => {
  if (!file.value) router.push('/')
  app.layoutHeader.value = file.value?.file.name || 'File'

  if (file.value) {
    if (!file.value.transcript && !file.value.loading) file.value.transcribe()
    if (!file.value.audio) file.value.getAudioInformation()
  }
})
</script>