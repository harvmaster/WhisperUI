import _ from 'lodash';

import { AudioInformation, Database__AudioFile, TranscribedAudio } from 'src/types';
import {
  createWaveforms,
  getAudioDuration,
  getCombinedAverageWaveform,
  transcribeAudio,
  diarizeAudio
} from 'src/lib/Audio';

export type AudioFileProps = {
  id: string;
  file: File;

  audio?: AudioInformation
  transcript?: TranscribedAudio;
  createdAt?: Date;
}

export class AudioFile {
  id: string;
  file: File;
  src: string;
  createdAt: Date;
  
  audio?: AudioInformation;
  transcript?: TranscribedAudio;
  
  loading: boolean

  constructor(props: AudioFileProps) {
    this.id = props.id;
    this.file = props.file;
    this.loading = false;

    // optional props
    this.audio = props.audio;
    this.transcript = props.transcript;
    this.createdAt = props.createdAt || new Date();

    // create url for audio file
    this.src = URL.createObjectURL(this.file);
    // if (!this.audio) this.getAudioInformation()
    // if (!this.transcript) this.transcribe()
  }

  // static method to create an AudioFile instance from a File object
  static async createFromFile(file: File): Promise<AudioFile> {
    return new AudioFile({
      id: file.name,
      file
    });
  }

  // static method to create an AudioFile instance from an object
  static async createFromObject(obj: AudioFileProps): Promise<AudioFile> {
    return new AudioFile(obj);
  }

  // method to update the audio information
  async getAudioInformation(): Promise<AudioInformation> {
    const duration = await getAudioDuration(this.file);
    const { waveforms, sampleRate } = await createWaveforms(this.file);
    const averagedWaveform = await getCombinedAverageWaveform(waveforms, sampleRate, duration/2000);

    this.audio = {
      duration,
      waveform: {
        sampleRate,
        waveforms: averagedWaveform
      }
    }

    return this.audio;
  }

  async transcribe(): Promise<TranscribedAudio | undefined> {
    this.loading = true
    try {
      this.transcript = await transcribeAudio(this.file)
    } catch (err) {
      console.error(err)
    } finally {
      this.loading = false
    }

    return this.transcript;
  }

  async getDiarization(): Promise<any> {
    const diarization = await diarizeAudio(this.file)
    console.log(diarization)
    return diarization
  }

  async toDatabaseAudioFile(): Promise<Database__AudioFile> {
    return {
      id: this.id,
      file: {
        name: this.file.name,
        type: this.file.type,
        data: await this.file.arrayBuffer()
      },
      audio: _.cloneDeep(this.audio),
      transcript: _.cloneDeep(this.transcript),
      createdAt: this.createdAt
    }
  }

}

export default AudioFile