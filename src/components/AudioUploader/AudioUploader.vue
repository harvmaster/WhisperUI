<template>
  <div class="">
    <div class="q-pa-md audio-upload-container row items-center bg-primary" @click="openFileBrowser">
      <div class="col-12 row justify-center q-col-gutter-y-md">
        <div class="col-auto">
          <q-icon name="cloud_upload" size="100px" color="blue-4" />
        </div>
        <div class="text-h6 text-center col-12">
          Drag & Drop your files here or
        </div>
        <div class="text-h5 text-center col-12">
          <q-btn label="Click to browse" unelevated class="bg-primary-700"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.audio-upload-container {
  border-radius: 1rem;
  width: 100%;
  border: 2px dashed var(--primary-600);
  
  aspect-ratio: 16/9;
  cursor: pointer;
}
</style>

<script setup lang="ts">
import { app } from 'boot/app'

import AudioFile from 'src/core/AudioFile';
import generateId from 'src/composables/generateId';

const openFileBrowser = () => {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'audio/*';
  fileInput.onchange = async (e) => {
    const file: File = e.target.files[0];

    const id = generateId();
    const audioFile = new AudioFile({
      id,
      file
    });
    app.files.value.push(audioFile)

    const appAudioFile = app.files.value.find((file) => file.id === id);
    if (!appAudioFile) return;
    
    appAudioFile.transcribe()
    appAudioFile.getDiarization()
    appAudioFile.getAudioInformation()

    
  };
  fileInput.click();
}
</script>