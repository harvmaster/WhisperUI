import { reactive, ref, watch } from 'vue';
import { Settings } from 'src/types';

import { saveAudioFiles, getAudioFiles } from 'src/core/Database/audioFile';
import { saveSettings, getSettings } from 'src/core/Database/Settings';
import { AudioFile } from 'src/core/AudioFile';

class App {
  readonly layoutHeader = ref<string | undefined>();
  
  readonly files = reactive<{ value: AudioFile[] }>({ value: [] });
  readonly settings = reactive<{ value: Settings }>({ value: { 
    endpoint: '',
    encode: true,
    task: 'Transcribe',
    language: 'en',
    timestamps: true
  } });

  async loadApp () {
    this.settings.value = await getSettings();

    this.files.value = await getAudioFiles();
    this.files.value.forEach((audioFile) => {
      if (!audioFile.audio) audioFile.getAudioInformation()
      // if (!audioFile.transcript) audioFile.transcribe()
    })
  }

  initListeners () {
    watch(this.files, () => {
      saveAudioFiles(this.files.value);
    })

    watch(this.settings, () => {
      saveSettings(this.settings.value);
    })
  }
}

const app = new App();

const initApp = async () => {
  await app.loadApp();
  app.initListeners();
}

initApp();

export { app }