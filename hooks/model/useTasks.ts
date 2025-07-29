import AsyncStorage from "@react-native-async-storage/async-storage";
import { create, StateCreator } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

import { randomUUID } from "@/lib/crypto";
import { invariant } from "@/lib/invariant";
import {
  createTask,
  createTaskLog,
  createTaskSchema,
  deleteTaskSchema,
  getTaskSchema,
  isActiveOnDate,
  listTasksForDateSchema,
  markTaskSchema,
  Task,
  TaskId,
  TaskLog,
  taskLogSchema,
  TasksStore,
  TaskStatus,
  updateTaskSchema
} from "@/model/Task";

const tasksStoreCreator: StateCreator<TasksStore> = (set, get) => ({
  tasks: [] as Task[],
  taskLogs: [] as TaskLog[],

  listTasksForDate(query) {
    const parsedQuery = listTasksForDateSchema.safeParse(query);

    if (!parsedQuery.success)
      return {
        success: false,
        error: { type: "ValidationError", error: parsedQuery.error, query },
      };

    const tasks = get().tasks.filter((task) =>
      isActiveOnDate(task, parsedQuery.data.date)
    );
    const taskStatusById = get().taskLogs.reduce(
      (acc, curr) => {
        acc[curr.taskId] = curr.status;
        return acc;
      },
      {} as Record<TaskId, TaskStatus>
    );

    const data = tasks.map((task) => ({
      ...task,
      status: taskStatusById[task.id],
    }));

    return { success: true, data };
  },

  getTask(query) {
    const parsedQuery = getTaskSchema.safeParse(query);

    if (!parsedQuery.success)
      return {
        success: false,
        error: { type: "ValidationError", error: parsedQuery.error, query },
      };

    const data = get().tasks.find((task) => task.id === query.id);

    if (!data)
      return {
        success: false,
        error: { type: "NotFoundError", query },
      };

    return { success: true, data };
  },

  createTask(mutation) {
    const parseResult = createTaskSchema.safeParse(mutation);
    if (!parseResult.success) {
      return {
        success: false,
        error: { type: "ValidationError", error: parseResult.error, mutation },
      };
    }

    const newTask = createTask(parseResult.data);

    set((prevState) => ({
      ...prevState,
      tasks: [...prevState.tasks, newTask],
    }));

    return { success: true, data: newTask };
  },

  updateTask(mutation) {
    const parseResult = updateTaskSchema.safeParse(mutation);
    if (!parseResult.success || !mutation.id) {
      return {
        success: false,
        error: { type: "ValidationError", error: parseResult.error, mutation },
      };
    }
    const tasks = get().tasks;
    const idx = tasks.findIndex((t) => t.id === mutation.id);
    if (idx === -1) {
      return { success: false, error: { type: "NotFoundError", mutation } };
    }
    const updatedTask = {
      ...tasks[idx],
      ...parseResult.data,
      updatedAt: new Date(),
    };
    const newTasks = [...tasks];
    newTasks[idx] = updatedTask;
    set({ tasks: newTasks });
    return { success: true, data: updatedTask };
  },

  deleteTask(mutation) {
    const parseResult = deleteTaskSchema.safeParse(mutation);
    if (!parseResult.success) {
      return {
        success: false,
        error: { type: "ValidationError", error: parseResult.error, mutation },
      };
    }
    const { id } = parseResult.data;
    const tasks = get().tasks;
    const idx = tasks.findIndex((t) => t.id === id);
    if (idx === -1) {
      return { success: false, error: { type: "NotFoundError", mutation } };
    }
    const newTasks = tasks.filter((t) => t.id !== id);
    set({ tasks: newTasks });
    return { success: true, data: undefined };
  },

  markTask(mutation) {
    const parsedMutation = markTaskSchema.safeParse(mutation);

    if (!parsedMutation.success) {
      return {
        success: false,
        error: { type: "ValidationError", error: parsedMutation.error, mutation },
      };
    }
    const tasks = get().tasks;
    const index = tasks.findIndex((t) => t.id === parsedMutation.data.id);
    if (index === -1) {
      return { success: false, error: { type: "NotFoundError", mutation } };
    }

    const newLog = createTaskLog(parsedMutation.data);

    set({ taskLogs: get().taskLogs.concat(newLog) });

    return { success: true, data: newLog };
  },
});

const useTasksStore = create<TasksStore>()(
  devtools(
    persist(tasksStoreCreator, {
      name: "tasks",
      storage: createJSONStorage(() => AsyncStorage),
    })
  )
);

export function useTasks() {
  return useTasksStore();
}
