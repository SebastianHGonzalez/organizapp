import {
  Task,
  TasksStore,
  createTaskSchema,
  updateTaskSchema,
  deleteTaskSchema,
} from "@/model/Task";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

const useTasksStore = create<TasksStore>()(
  devtools(
    persist(
      (set, get) => ({
        tasks: [] as Task[],

        create(task) {
          const parseResult = createTaskSchema.safeParse(task);
          if (!parseResult.success) {
            return { success: false, error: { type: "ValidationError" } };
          }
          // Generate a new Task object with a unique id and default fields
          const newTask: Task = {
            ...parseResult.data,
            id: crypto.randomUUID(),
            taskType: "task",
            status: "active",
            createdAt: new Date(),
            updatedAt: new Date(),
          };

          // Add the new task to the store
          set((prevState) => ({
            ...prevState,
            tasks: [...prevState.tasks, newTask],
          }));

          return { success: true, data: newTask };
        },
        update(task) {
          const parseResult = updateTaskSchema.safeParse(task);
          if (!parseResult.success || !task.id) {
            return { success: false, error: { type: "NotFoundError" } };
          }
          const tasks = get().tasks;
          const idx = tasks.findIndex((t) => t.id === task.id);
          if (idx === -1) {
            return { success: false, error: { type: "NotFoundError" } };
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
        delete(task) {
          const parseResult = deleteTaskSchema.safeParse(task);
          if (!parseResult.success) {
            return { success: false, error: { type: "NotFoundError" } };
          }
          const { id } = parseResult.data;
          const tasks = get().tasks;
          const idx = tasks.findIndex((t) => t.id === id);
          if (idx === -1) {
            return { success: false, error: { type: "NotFoundError" } };
          }
          const newTasks = tasks.filter((t) => t.id !== id);
          set({ tasks: newTasks });
          return { success: true, data: undefined };
        },
      }),
      {
        name: "tasks",
        storage: createJSONStorage(() => AsyncStorage),
      }
    )
  )
);

export default useTasksStore;
