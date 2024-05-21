import { openDB, IDBPDatabase } from 'idb'

import { AudioInformation, TranscribedAudio } from 'src/types'

export * as AudioFile from './audioFile'
export * as Settings from './Settings'

interface DatabaseSchema {
  audioFiles: {
    id: string;
    file: File;
    url: string;
    audio: AudioInformation;
    transcript: TranscribedAudio | null;
  }
  settings: {
    id: string
    key: string
    value: string
  }
}

export const settings = {
  dbName: 'WhisperUI',
  dbVersion: 1
}

class Database {
  public static dbInstance: Database
  public db: IDBPDatabase<DatabaseSchema>

  constructor(db: IDBPDatabase<DatabaseSchema>) {
    this.db = db
  }

  static async getDB(dbName: string, version = 1): Promise<Database> {
    if (!this.dbInstance) {
      Database.dbInstance = new Database(await openDB<DatabaseSchema>(dbName, version, {
        upgrade(db) {
          if (!db.objectStoreNames.contains('audioFiles')) {
            db.createObjectStore('audioFiles', { keyPath: 'id' })
          }

          if (!db.objectStoreNames.contains('settings')) {
            db.createObjectStore('settings', { keyPath: 'id' })
          }
        },
        blocked() {
          console.error('blocked')
        },
        terminated() {
          console.error('terminated')
        }
      }))
    }

    return Database.dbInstance
  }
}

export default Database