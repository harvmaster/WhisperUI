import { reactive, ref } from 'vue';

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

}

export const app = new App();