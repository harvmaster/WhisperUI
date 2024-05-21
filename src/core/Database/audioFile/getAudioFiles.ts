import { Database__AudioFile, UploadedAudioFile } from 'src/types'
import Database, { settings } from '../'

import { arrayBufferToBlob } from 'src/lib/FileStorage'
import { AudioFile } from 'src/core/AudioFile'

export default async function getAudioFiles(): Promise<AudioFile[]> {
  const db = await Database.getDB(settings.dbName, settings.dbVersion)

  const tx = db.db.transaction('audioFiles', 'readonly')
  const store = tx.objectStore('audioFiles')

  const dbAudioFiles: Database__AudioFile[] = await store.getAll()

  await tx.done

  const audioFiles: AudioFile[] = dbAudioFiles.map((audioFile) => {
    const file = new File([arrayBufferToBlob(audioFile.file.data, audioFile.file.type)], audioFile.file.name)

    return new AudioFile({...audioFile, file: file })
  })

  // dbAudioFiles.map((audioFile) => {
  //   return {
  //     id: audioFile.id,
  //     file: file, 
  //     url: URL.createObjectURL(file),
  //     audio: audioFile.audio,
  //     transcript: audioFile.transcript,
  //     loading: false
  //   }
  // })

  return audioFiles
}