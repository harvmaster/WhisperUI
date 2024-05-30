<template>
  <q-page class="row items-center justify-center">

    <div class="col-12 col-sm-12 col-md-8 row q-col-gutter-y-md q-pa-md">

      <div class="col-12 row justify-center">
        <div class="col-auto column">
          
          <div class="col-auto text-h4 text-weight-medium q-col-gutter-x-md row">
            <div class="col-auto">
              <q-icon name="upload_file" class="self-center full-height" />
            </div>
            <div class="col-auto self-center">
              Upload Audio
            </div>
          </div>
          
          <div class="col-auto text-h6 q-pt-sm q-pb-md">
            Upload your audio files to transcribe with whisper
          </div>

          <div class="col-auto row justify-center">
            <audio-uploader class="col-auto" />
          </div>
        </div>
      </div>

      <div v-if="app.files.value.length > 0" class="col-12">
        <q-separator />
      </div>

      <div class="col-12 row q-col-gutter-y-sm justify-center">
        <div class="col-12 row justify-center" v-for="file of app.files.value" :key="file.id">
          <audio-file-preview class="col-auto file-preview" :file="file" />
        </div>
      </div>
      
      <!-- <div class="col-12 row q-col-gutter-y-md">
        <audio-file class="col-12" v-for="file of app.files.value"
          :key="file.id"
          :file="file"
        />
      </div> -->
    </div>

    

  </q-page>
</template>

<style lang="scss" scoped>
.file-preview {
  max-width: 100%;
  width: 40em;
}
</style>

<script setup lang="ts">
import { app } from 'boot/app'

import AudioUploader from 'components/AudioUploader/AudioUploader.vue';
import AudioFilePreview from 'components/AudioFile/AudioFilePreview.vue';
// import AudioFile from 'components/AudioFile/AudioFile.vue';

</script>
