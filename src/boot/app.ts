import { reactive, ref, watch } from 'vue';

export type AudioInformation = {
  duration: number;
  waveform: {
    waveforms: number[];
    sampleRate: number;
  };
}

export type WhisperTranscript = {
  text: string;
  confidence: number;
  start: number;
  end: number;
  speaker: number;
}

export type UploadedAudioFile = {
  id: string;
  file: File;
  url: string;
  audio: AudioInformation;
  transcript: WhisperTranscript[];
  loading: boolean;
}

export type Settings = {
  endpoint: string;
  encode: boolean;
  task: 'Transcribe' | 'Translate';
  language: string;
  timestamps: boolean;
}

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
      localStorage.setItem('files', JSON.stringify(this.files.value));
    })

    watch(this.settings, () => {
      localStorage.setItem('settings', JSON.stringify(this.settings.value));
    })
  }
}

const app = new App();
app.loadApp();
app.initListeners();

export { app }