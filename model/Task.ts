import { z } from "zod";
import { Result } from "./Store";

export const taskSchema = z.object({
  id: z.string().uuid(),
  parentTaskId: z.string().uuid().optional(),
  taskType: z
    .enum(["task", "project", "goal", "habit", "note"])
    .default("task"),

  name: z.string(),
  description: z.string().optional(),

  timesOfDay: z
    .array(z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/))
    .optional(),
  daysOfMonth: z.array(z.number().min(1).max(31)).optional(),
  daysOfWeek: z.array(z.number().min(0).max(6)).optional(),
  monthsOfYear: z.array(z.number().min(1).max(12)).optional(),

  startDate: z.date().optional(),
  endDate: z.date().optional(),

  priority: z.enum(["low", "medium", "high"]).optional(),
  color: z.string().optional(),
  tags: z.array(z.string()).optional(),

  status: z.enum(["active", "inactive"]).default("active"),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
export type Task = z.infer<typeof taskSchema>;

export const createTaskSchema = taskSchema.pick({
  name: true,
  description: true,
  startDate: true,
  endDate: true,
  priority: true,
});
export type CreateTask = z.infer<typeof createTaskSchema>;

export const updateTaskSchema = taskSchema.partial();
export type UpdateTask = z.infer<typeof updateTaskSchema>;

export const deleteTaskSchema = z.object({
  id: z.string().uuid(),
});
export type DeleteTask = z.infer<typeof deleteTaskSchema>;

type ValidationError = { type: "ValidationError" };
type NotFoundError = { type: "NotFoundError" };

export interface TasksStore {
  tasks: Task[];
  create(task: CreateTask): Result<Task, ValidationError>;
  update(task: UpdateTask): Result<Task, NotFoundError>;
  delete(task: DeleteTask): Result<void, NotFoundError>;
}
