import { reactive, ref, watch } from 'vue';
import { UploadedAudioFile, Settings } from 'src/types';

class App {
  readonly files = reactive<{ value: UploadedAudioFile[] }>({ value: [] });
  readonly settings = reactive<{ value: Settings }>({ value: { 
    endpoint: '',
    encode: true,
    task: 'Transcribe',
    language: 'en',
    timestamps: true
  } });

  loadApp () {
    const files = localStorage.getItem('files');
    if (files) {
      this.files.value = JSON.parse(files);
    }
    console.log(this.files.value);  

    const settings = localStorage.getItem('settings');
    if (settings) {
      this.settings.value = JSON.parse(settings);
    }
  }

  initListeners () {
    watch(this.files, () => {
      this.files.value[0].file.
      // localStorage.setItem('files', JSON.stringify(this.files.value));
    })

    watch(this.settings, () => {
      // localStorage.setItem('settings', JSON.stringify(this.settings.value));
    })
  }
}

const app = new App();
app.loadApp();
app.initListeners();

export { app }