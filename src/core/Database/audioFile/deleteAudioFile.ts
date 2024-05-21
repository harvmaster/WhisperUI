import Database, { settings } from '../'

export default async function deleteAudioFile(id: string): Promise<void> {
  const db = await Database.getDB(settings.dbName, settings.dbVersion)

  const tx = db.db.transaction('audioFiles', 'readwrite')
  const store = tx.objectStore('audioFiles')

  store.delete(id)

  await tx.done
}