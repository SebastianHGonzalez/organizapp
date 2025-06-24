import { TaskSchedule } from "@/model/TaskSchedule";
import { SQLiteDatabase } from "expo-sqlite";

function createTableIfNotExists(db: SQLiteDatabase) {
  db.execAsync(`
    CREATE TABLE IF NOT EXISTS task_schedules (
      id TEXT PRIMARY KEY,
      taskId TEXT NOT NULL,
      frequency TEXT NOT NULL,
      timeOfDay TEXT,
      daysOfMonth TEXT,
      daysOfWeek TEXT,
      monthOfYear TEXT,
      startDate TEXT NOT NULL,
      endDate TEXT,
      status TEXT NOT NULL DEFAULT 'active',
      createdAt TEXT NOT NULL,
      updatedAt TEXT,
      FOREIGN KEY (taskId) REFERENCES tasks(id)
    )
  `);
}

export function migrateTaskSchedulesIfNeeded(
  db: SQLiteDatabase,
  version: number,
) {
  if (version === 0) {
    createTableIfNotExists(db);
  }
}

export function getAllTaskSchedulesIfNeeded(db: SQLiteDatabase) {
  return db.getAllAsync<TaskSchedule>("SELECT * FROM task_schedules");
}
