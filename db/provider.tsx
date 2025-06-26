import { SQLiteDatabase, SQLiteProvider } from "expo-sqlite";
import React, { PropsWithChildren } from "react";
import { migrateTasksIfNeeded } from "./tasks";
import { migrateTaskLogsIfNeeded } from "./task-logs";

const databaseName = "organizapp.db";

export function DbProvider({ children }: PropsWithChildren) {
  return (
    <SQLiteProvider databaseName={databaseName} onInit={migrateDbIfNeeded}>
      {children}
    </SQLiteProvider>
  );
}

const DATABASE_VERSION = 1;

async function migrateDbIfNeeded(db: SQLiteDatabase) {
  let { user_version: currentDbVersion } = (await db.getFirstAsync<{
    user_version: number;
  }>("PRAGMA user_version")) ?? { user_version: 0 };

  for (let version = currentDbVersion; version < DATABASE_VERSION; version++) {
    migrateTasksIfNeeded(db, version);
    migrateTaskLogsIfNeeded(db, version);
    await db.execAsync(`
      PRAGMA user_version = ${version + 1}
    `);
  }
}
