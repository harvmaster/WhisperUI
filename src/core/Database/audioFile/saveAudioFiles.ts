import { Database__AudioFile } from 'src/types'
import Database, { settings } from '..'
import { AudioFile } from 'src/core/AudioFile'

export default async function saveAudioFiles(audioFiles: AudioFile[]): Promise<void> {
  const db = await Database.getDB(settings.dbName, settings.dbVersion)

  console.log('Saving audio files')
  const formattedAudioFiles: Database__AudioFile[] = await Promise.all(audioFiles.map(async (audioFile) => await audioFile.toDatabaseAudioFile()))
  console.log(formattedAudioFiles)
  
  const tx = db.db.transaction('audioFiles', 'readwrite')
  const store = tx.objectStore('audioFiles')
  console.log(tx)

  for (const audioFile of formattedAudioFiles) {
    store.put(audioFile)
  }

  await tx.done
}

// const formatAudioFile = async (audioFile: UploadedAudioFile): Promise<Database__AudioFile> => {
//   return {
//     id: audioFile.id,
//     file: {
//       name: audioFile.file.name,
//       type: audioFile.file.type,
//       data: await audioFile.file.arrayBuffer()
//     },
//     audio: {
//       duration: audioFile.audio.duration,
//       waveform: {
//         sampleRate: audioFile.audio.waveform.sampleRate,
//         waveforms: [...audioFile.audio.waveform.waveforms]
//       }
//     },
//     transcript: audioFile.transcript
//   }
// }