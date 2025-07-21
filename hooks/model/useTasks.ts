import { invariant } from "@/lib/invariant";
import {
  Task,
  TasksStore,
  createTaskSchema,
  updateTaskSchema,
  deleteTaskSchema,
  taskLogSchema,
  taskSchema,
  markTaskSchema,
} from "@/model/Task";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create, StateCreator } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { randomUUID } from "@/lib/crypto";

const tasksStoreCreator: StateCreator<TasksStore> = (set, get) => ({
  tasks: [] as Task[],

  createTask(task) {
    const parseResult = createTaskSchema.safeParse(task);
    if (!parseResult.success) {
      return {
        success: false,
        error: { type: "ValidationError", error: parseResult.error, task },
      };
    }

    const newTask: Task = {
      id: randomUUID() as Task["id"],
      type: "task",
      taskType: "task",
      name: parseResult.data.name,
      description: parseResult.data.description,
      priority: parseResult.data.priority,
      color: undefined,
      tags: [],
      logs: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      startDate: parseResult.data.startDate,
      endDate: parseResult.data.endDate,
      parentTaskId: undefined,
    };

    set((prevState) => ({
      ...prevState,
      tasks: [...prevState.tasks, newTask],
    }));

    return { success: true, data: newTask };
  },
  updateTask(task) {
    const parseResult = updateTaskSchema.safeParse(task);
    if (!parseResult.success || !task.id) {
      return {
        success: false,
        error: { type: "ValidationError", error: parseResult.error, task },
      };
    }
    const tasks = get().tasks;
    const idx = tasks.findIndex((t) => t.id === task.id);
    if (idx === -1) {
      return { success: false, error: { type: "NotFoundError", task } };
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
  deleteTask(task) {
    const parseResult = deleteTaskSchema.safeParse(task);
    if (!parseResult.success) {
      return {
        success: false,
        error: { type: "ValidationError", error: parseResult.error, task },
      };
    }
    const { id } = parseResult.data;
    const tasks = get().tasks;
    const idx = tasks.findIndex((t) => t.id === id);
    if (idx === -1) {
      return { success: false, error: { type: "NotFoundError", task } };
    }
    const newTasks = tasks.filter((t) => t.id !== id);
    set({ tasks: newTasks });
    return { success: true, data: undefined };
  },
  markTask(task) {
    const parseResult = markTaskSchema.safeParse(task);

    if (!parseResult.success) {
      return {
        success: false,
        error: { type: "ValidationError", error: parseResult.error, task },
      };
    }
    const tasks = get().tasks;
    const index = tasks.findIndex((t) => t.id === parseResult.data.id);
    if (index === -1) {
      return { success: false, error: { type: "NotFoundError", task } };
    }

    const newLog = taskLogSchema.safeParse({ status });
    invariant(newLog.success, "invalid task log", { task, index });
    if (!newLog.success)
      return {
        success: false,
        error: { type: "ValidationError", error: newLog.error, task },
      }; // Never hit. Required for type inference

    const updatedTask = taskSchema.safeParse({
      ...tasks[index],
      logs: [...(tasks[index].logs || []), newLog.data],
      updatedAt: new Date(),
    });
    invariant(updatedTask.success, "invalid updated task", {
      task,
      updatedTask,
      newLog: newLog.data,
    });
    if (!updatedTask.success)
      return {
        success: false,
        error: { type: "ValidationError", error: updatedTask.error, task },
      }; // Never hit. Required for type inference

    const newTasks = [...tasks];
    newTasks[index] = updatedTask.data;
    set({ tasks: newTasks });

    return { success: true, data: updatedTask.data };
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
