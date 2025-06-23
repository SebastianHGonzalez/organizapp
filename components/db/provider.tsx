import { SQLiteDatabase, SQLiteProvider } from "expo-sqlite";
import React, { PropsWithChildren } from "react";

const databaseName = "organizapp.db";

export function DbProvider({ children }: PropsWithChildren) {
  return (
    <SQLiteProvider databaseName={databaseName} onInit={migrateDbIfNeeded}>
      {children}
    </SQLiteProvider>
  );
}

async function migrateDbIfNeeded(db: SQLiteDatabase) {
  let { user_version: currentDbVersion } = (await db.getFirstAsync<{
    user_version: number;
  }>("PRAGMA user_version")) ?? { user_version: 0 };

  if (currentDbVersion === 0) {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        startDate TEXT NOT NULL,
        endDate TEXT,
        status TEXT NOT NULL
      )
    `);
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        startDate TEXT NOT NULL,
        endDate TEXT,
        status TEXT NOT NULL
      )
    `);
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS task_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        task_id INTEGER NOT NULL,
        date TEXT NOT NULL,
        status TEXT NOT NULL,
        notes TEXT
      )
    `);
    await db.execAsync(`
      PRAGMA user_version = 1
    `);
    currentDbVersion = 1;
  }
}
