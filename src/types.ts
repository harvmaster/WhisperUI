import AudioFile from "./core/AudioFile";

export type AudioInformation = {
  duration: number;
  waveform: {
    waveforms: number[];
    sampleRate: number;
  };
}

export type TranscribedAudioSegmentWord = {
  start: number;
  end: number;
  probability: number;
  word: string;
}

export type TranscribedAudioSegment = {
  id: number;
  start: number;
  end: number;
  seek: number;
  text: string;

  tokens: number[];
  words: TranscribedAudioSegmentWord[];

  temperature: number;
  no_speech_prob: number;
  compression_ratio: number;
  avg_logprob: number;
}

export type TranscribedAudio = {
  language: string;
  text: string;
  segments: TranscribedAudioSegment[]
}

export type UploadedAudioFile = {
  id: string;
  file: File;
  url: string;

  audio?: AudioInformation;
  transcript?: TranscribedAudio;
  createdAt?: Date;
  
  loading: boolean;
}

export type Settings = {
  endpoint: string;
  encode: boolean;
  task: 'Transcribe' | 'Translate';
  language: string;
  timestamps: boolean;
}

export type Database__Settings = Settings

export type Database__AudioFile = {
  id: string;
  createdAt: Date;
  file: {
    name: string;
    type: string;
    data: ArrayBuffer;
  }
  audio: AudioInformation;
  transcript: TranscribedAudio;
}