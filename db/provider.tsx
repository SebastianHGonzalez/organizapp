import { createContext, use } from "react";
import * as SQLite from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { schema, Table } from "./schema";

const databaseName = "organizapp.db";
const expo = SQLite.openDatabaseSync(databaseName);
const db = drizzle(expo, {
  schema,
});

const defaultContextValue = {
  db,
  schema,
} as const;
export type DBContext = typeof defaultContextValue;

const dbContext = createContext(defaultContextValue);

export function useDBContext() {
  return use(dbContext);
}

export const DBProvider = dbContext.Provider;

