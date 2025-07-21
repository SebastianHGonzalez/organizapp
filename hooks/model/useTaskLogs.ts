import {
  TaskLog,
  TaskLogsStore,
  createTaskLogSchema,
  updateTaskLogSchema,
  deleteTaskLogSchema,
} from "@/model/TaskLog";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

export const useTaskLogsStore = create<TaskLogsStore>()(
  devtools(
    persist(
      (set, get) => ({
        taskLogs: [] as TaskLog[],

        create(taskLog) {
          const parseResult = createTaskLogSchema.safeParse(taskLog);
          if (!parseResult.success) {
            return { success: false, error: { type: "ValidationError" } };
          }
          const newTaskLog: TaskLog = {
            ...parseResult.data,
            id: crypto.randomUUID(),
            type: "taskLog" as const,
            createdAt: new Date(),
          };
          set((state) => ({
            ...state,
            taskLogs: [...state.taskLogs, newTaskLog],
          }));
          return { success: true, data: newTaskLog };
        },
        update(taskLog) {
          const parseResult = updateTaskLogSchema.safeParse(taskLog);
          if (!parseResult.success || !taskLog.id) {
            return { success: false, error: { type: "NotFoundError" } };
          }
          const index = get().taskLogs.findIndex((t) => t.id === taskLog.id);
          if (index === -1) {
            return { success: false, error: { type: "NotFoundError" } };
          }
          const updated: TaskLog = {
            ...get().taskLogs[index],
            ...parseResult.data,
            type: "taskLog" as const,
          };
          const updatedLogs = [...get().taskLogs];
          updatedLogs[index] = updated;
          set((state) => ({ ...state, taskLogs: updatedLogs }));
          return { success: true, data: updated };
        },
        delete(taskLog) {
          const parseResult = deleteTaskLogSchema.safeParse(taskLog);
          if (!parseResult.success) {
            return { success: false, error: { type: "NotFoundError" } };
          }
          const index = get().taskLogs.findIndex((t) => t.id === taskLog.id);
          if (index === -1) {
            return { success: false, error: { type: "NotFoundError" } };
          }
          set((state) => ({
            ...state,
            taskLogs: state.taskLogs.filter((t) => t.id !== taskLog.id),
          }));
          return { success: true, data: undefined };
        },
      }),
      {
        name: "taskLogs",
        storage: createJSONStorage(() => AsyncStorage),
      }
    )
  )
);
