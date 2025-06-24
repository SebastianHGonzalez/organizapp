import { Project } from "@/model/Project";
import { SQLiteDatabase } from "expo-sqlite";

function createTableIfNotExists(db: SQLiteDatabase) {
  db.execAsync(`
        CREATE TABLE IF NOT EXISTS projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            startDate TEXT NOT NULL,
            endDate TEXT,
            status TEXT NOT NULL
        )
    `);
}

function seedTable(db: SQLiteDatabase) {
  db.execAsync(`
    INSERT INTO projects (name, description, startDate, endDate, status) VALUES
    ('Project 1', 'Description 1', '2021-01-01', '2021-01-01', 'active'),
    ('Project 2', 'Description 2', '2021-01-01', '2021-01-01', 'active')
  `);
}

export function migrateProjectsIfNeeded(db: SQLiteDatabase, version: number) {
  if (version === 0) {
    createTableIfNotExists(db);
  }

  seedTable(db);
}

export interface GetAllProjectsParams {
  offset?: number;
  limit?: number;
}

export function getAllProjects(
  db: SQLiteDatabase,
  { offset = 0, limit = 10 }: GetAllProjectsParams = {},
) {
  return db.getAllAsync<Project>("SELECT * FROM projects LIMIT ? OFFSET ?", [
    limit,
    offset,
  ]);
}
