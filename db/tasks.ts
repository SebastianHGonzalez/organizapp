import { Task } from "@/model/Task";
import { SQLiteDatabase } from "expo-sqlite";

function createTableIfNotExists(db: SQLiteDatabase) {
  db.execAsync(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      startDate TEXT NOT NULL,
      endDate TEXT,
      status TEXT NOT NULL
    )
  `);
}

export function migrateTasksIfNeeded(db: SQLiteDatabase, version: number) {
  if (version === 0) {
    createTableIfNotExists(db);
  }
}

export function getAllTasks(db: SQLiteDatabase) {
  return db.getAllAsync<Task>("SELECT * FROM tasks");
}
