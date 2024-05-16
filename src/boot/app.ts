import { reactive, ref } from 'vue';

export type AudioInformation = {
  duration: number;
  waveform: {
    waveforms: Float32Array[];
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
}

class App {
  readonly files = reactive<{ value: UploadedAudioFile[] }>({ value: [] });

}

export const app = new App();