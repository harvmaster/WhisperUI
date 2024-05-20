import { Database__Settings } from "src/types";
import Database, { settings as dbSettings } from "src/core/Database";

const settingsId = 1;
export default async function saveSettings(settings: Database__Settings): Promise<void> {
  const db = await Database.getDB(dbSettings.dbName, dbSettings.dbVersion);

  const tx = db.db.transaction("settings", "readwrite");
  const store = tx.objectStore("settings");

  await store.put(settings, settingsId);

  await tx.done;
}