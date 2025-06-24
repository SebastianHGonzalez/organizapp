import { Task } from "@/model/Task";
import { SQLiteDatabase } from "expo-sqlite";

function createTableIfNotExists(db: SQLiteDatabase) {
  db.execAsync(`
    CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY,
      parentTaskId TEXT,
      taskType TEXT NOT NULL DEFAULT 'task',
      name TEXT NOT NULL,
      description TEXT,
      startDate TEXT,
      endDate TEXT,
      priority TEXT,
      color TEXT,
      tags TEXT,
      status TEXT NOT NULL DEFAULT 'active',
      createdAt TEXT,
      updatedAt TEXT
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

export function getAllTasksByType(
  db: SQLiteDatabase,
  type: Task["taskType"],
  offset: number,
  limit: number,
) {
  return db.getAllAsync<Task>(
    `SELECT * FROM tasks WHERE taskType = ? LIMIT ? OFFSET ?`,
    [type, limit, offset],
  );
}
