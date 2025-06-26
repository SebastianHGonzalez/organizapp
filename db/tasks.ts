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
      timesOfDay TEXT,
      daysOfMonth TEXT,
      daysOfWeek TEXT,
      monthsOfYear TEXT,
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

export async function createTask(db: SQLiteDatabase, task: Task) {
  await db.runAsync(
    `INSERT INTO tasks (
      id,
      parentTaskId,
      taskType,
      name,
      description,
      timesOfDay,
      daysOfMonth,
      daysOfWeek,
      monthsOfYear,
      startDate,
      endDate,
      priority,
      color,
      tags,
      status,
      createdAt,
      updatedAt
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      task.id,
      task.parentTaskId ?? null,
      task.taskType,
      task.name,
      task.description ?? null,
      task.timesOfDay ? JSON.stringify(task.timesOfDay) : null,
      task.daysOfMonth ? JSON.stringify(task.daysOfMonth) : null,
      task.daysOfWeek ? JSON.stringify(task.daysOfWeek) : null,
      task.monthsOfYear ? JSON.stringify(task.monthsOfYear) : null,
      task.startDate ? task.startDate.toISOString() : null,
      task.endDate ? task.endDate.toISOString() : null,
      task.priority ?? null,
      task.color ?? null,
      task.tags ? JSON.stringify(task.tags) : null,
      task.status,
      task.createdAt ? task.createdAt.toISOString() : new Date().toISOString(),
      task.updatedAt ? task.updatedAt.toISOString() : new Date().toISOString(),
    ]
  );
}
