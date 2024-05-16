<template>
  <q-page class="row items-center justify-center">

    <div class="col-12 col-md-auto column q-col-gutter-y-sm q-pa-md">

      <!-- Header information -->
      <div class="col-auto row text-h4 text-weight-medium q-col-gutter-x-lg">
        <div class="col-auto self-center">
          <q-icon name="upload_file" class="full-height" />
        </div>
        <div class="col-auto self-center">
          Upload Audio
        </div>
      </div>
      <div class="coll-auto fit-width text-h6 q-pt-sm q-pb-md">
        Upload your audio files to transcribe with whisper
      </div>

      <!-- Upload component -->
      <div class="col-auto row">
        <audio-uploader class="" />
      </div>
    </div>

    <!-- Upload -->
    <div class="col-12 col-md-6 row upload-section q-col-gutter-y-sm q-pa-md">

      <!-- Upload text and description -->
      <div class="col-12 row text-h4 text-weight-medium q-col-gutter-x-lg">
        <div class="col-auto self-center">
          <q-icon name="upload_file" class="full-height" />
        </div>
        <div class="col-auto self-center">
          Upload Audio
        </div>
        <div class="col-12 text-h6 q-pt-sm q-pb-md">
          Upload your audio files to transcribe with whisper
        </div>
      </div>

      <!-- Upload component -->
      <div class="col-12 row">
        <audio-uploader class="fit" />
      </div>

    </div>

    <div class="col-12 row">
      <audio-file v-for="file of app.files.value" :key="file.url" />
    </div>
    

  </q-page>
</template>

<style lang="scss" scoped>
.fit-width {
  width: fit-content
}
</style>

<script setup lang="ts">
import { app } from 'boot/app'

import AudioUploader from 'components/AudioUploader/AudioUploader.vue';
import AudioFile from 'components/AudioFile/AudioFile.vue';

</script>
