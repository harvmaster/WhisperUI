<template>
  <q-page class="row items-center justify-center">

    <div class="col-12 col-sm-12 row q-col-gutter-y-md q-pa-md page-limit-width">

      <!-- Header information -->
      <div class="col-12 row text-h4 text-weight-medium q-col-gutter-x-md">
        <div class="col-auto self-center row">
          <q-icon name="upload_file" class="self-center full-height" />
        </div>
        <div class="col-auto self-center">
          Upload Audio
        </div>
      </div>
      <div class="col-12 fit-width text-h6 q-pt-sm q-pb-md">
        Upload your audio files to transcribe with whisper
      </div>

      <!-- Upload component -->
      <div class="col-12 row">
        <audio-uploader class="col-12" />
      </div>

      <div v-if="app.files.value.length > 0" class="col-12">
        <q-separator />
      </div>
      
      <div class="col-12 row q-col-gutter-y-md">
        <audio-file class="col-12" v-for="file of app.files.value"
          :key="file.url"
          :id="file.id"
          :src="file.url"
          :url="file.id"
          :audio="file.audio"
          :file="file.file"
          :transcript="file.transcript"
          :loading="file.loading"
        />
      </div>
    </div>

    

  </q-page>
</template>

<style lang="scss" scoped>
.fit-width {
  width: fit-content
}

.page-limit-width {
  max-width: min(50em, 100vw - 2em);
}
</style>

<script setup lang="ts">
import { app } from 'boot/app'

import AudioUploader from 'components/AudioUploader/AudioUploader.vue';
import AudioFile from 'components/AudioFile/AudioFile.vue';

</script>
