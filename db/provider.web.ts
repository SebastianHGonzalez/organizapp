import { createContext, use } from "react";
import { create } from 'zustand'
import { Task } from "@/model/Task";
import { TaskLog } from "@/model/TaskLog";

type Entity = Task | TaskLog;
const schema = {
    tasks: [] as Task[],
    taskLogs: [] as TaskLog[],
} as const;

interface FindManyParams {
    offset?: number;
    limit?: number;
}

const defaultContextValue = {
    db: {
        query: {
            tasks: {
                findMany: (params?: FindManyParams) => schema.tasks.slice(params?.offset ?? 0, params?.offset ?? 0 + (params?.limit ?? 10)),
            },
            taskLogs: {
                findMany: (params?: FindManyParams) => schema.taskLogs.slice(params?.offset ?? 0, params?.offset ?? 0 + (params?.limit ?? 10)),
            },
        },
        insert: <E extends Entity>(into: E[]) => ({ values: (v: E) => into.push(v) }),
    },
    schema: schema,
} as const;
export type DBContext = typeof defaultContextValue;

const dbContext = createContext(defaultContextValue);

export function useDBContext() {
    return use(dbContext);
}

export const DBProvider = dbContext.Provider;
