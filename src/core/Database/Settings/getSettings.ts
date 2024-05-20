import { Database__Settings } from 'src/types';
import Database, { settings as dbSettings } from 'src/core/Database'

const settingsId = 1;
export default async function getSettings(): Promise<Database__Settings> {
  const db = await Database.getDB(dbSettings.dbName, dbSettings.dbVersion)

  const tx = db.db.transaction('settings', 'readonly')
  const store = tx.objectStore('settings')

  const settings = await store.get(settingsId)

  await tx.done

  if (!settings) {
    return {
      endpoint: '',
      encode: true,
      task: 'Transcribe',
      language: 'en',
      timestamps: true
    }
  }
  return settings
}