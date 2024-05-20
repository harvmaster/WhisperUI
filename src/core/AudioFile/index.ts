

export class AudioFile {
  id: string;
  file: File;
  url: string;
  audio: AudioInformation;
  transcript: TranscribedAudio | null;
  loading: boolean
}