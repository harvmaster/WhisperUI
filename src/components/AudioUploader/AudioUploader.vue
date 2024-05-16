<template>
  <div class="">
    <div class="q-pa-md audio-upload-container row items-center" @click="openFileBrowser">
      <div class="col-12 row justify-center q-col-gutter-y-md">
        <div class="col-auto">
          <q-icon name="cloud_upload" size="100px" color="blue-4" />
        </div>
        <div class="text-h6 text-center col-12">
          Drag & Drop your files here or
        </div>
        <div class="text-h5 text-center col-12">
          <q-btn label="Click to browse" unelevated color="blue-4"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.audio-upload-container {
  background-color: $blue-2;
  color: #212121;
  border-radius: 1rem;
  cursor: pointer;
  width: 100%;
  // max-width: 600px;
  aspect-ratio: 16/9;
  border: 2px dashed $blue-4;
}
</style>

<script setup lang="ts">
import { app } from 'boot/app'

import createWaveforms from 'src/lib/Audio/createWaveforms';
import getCombinedAverageWaveform from 'src/lib/Audio/getCombinedAverageWaveform';
import getAverageWaveforms from 'src/lib/Audio/getAverageWaveforms';
import getAudioDuration from 'src/lib/Audio/getAudioDuration';

const openFileBrowser = () => {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'audio/*';
  fileInput.onchange = async (e) => {
    const file = e.target.files[0];

    const start = performance.now()
    const duration = await getAudioDuration(file);

    const afterDuration = performance.now();

    const { waveforms, sampleRate } = await createWaveforms(file);


    const afterWaveforms = performance.now();
    
    const averaged = await getCombinedAverageWaveform(waveforms, sampleRate, duration/20);

    const afterAveraged = performance.now();

    console.log('Duration:', afterDuration - start);
    console.log('Waveforms:', afterWaveforms - afterDuration);
    console.log('Averaged:', afterAveraged - afterWaveforms);
    console.log(averaged)

    const max = Math.max(...averaged);
    const min = Math.min(...averaged);
    const range = max - min;

    const scaled = averaged.map((value) => {
      return (value - min) / range;
    });

    console.log(scaled);

    console.log(file);

    app.files.value.push({
      file,
      url: URL.createObjectURL(file),
      audio: {
        duration,
        waveform: {
          waveforms,
          sampleRate,
        }
      },
      transcript: []
    })

  };
  fileInput.click();
}
</script>