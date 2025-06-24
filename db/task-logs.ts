import { TaskLog } from "@/model/TaskLog";
import { SQLiteDatabase } from "expo-sqlite";

function createTableIfNotExists(db: SQLiteDatabase) {
  db.execAsync(`
    CREATE TABLE IF NOT EXISTS task_logs (
      id TEXT PRIMARY KEY,
      taskId TEXT NOT NULL,
      date TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'not_completed',
      notes TEXT,
      createdAt TEXT NOT NULL,
      updatedAt TEXT,
      FOREIGN KEY (taskId) REFERENCES tasks(id)
    )
  `);
}

export function migrateTaskLogsIfNeeded(db: SQLiteDatabase, version: number) {
  if (version === 0) {
    createTableIfNotExists(db);
  }
}

export function getAllTaskLogs(db: SQLiteDatabase) {
  return db.getAllAsync<TaskLog>("SELECT * FROM task_logs");
}
