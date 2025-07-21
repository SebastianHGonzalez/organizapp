import { z } from "zod";
import { Result } from "./Store";

const taskStatusSchema = z.enum(["completed", "skipped", "not_completed"]);

const taskTypeSchema = z.enum(["task", "project", "goal", "habit", "note"]);

const prioritySchema = z.enum(["low", "medium", "high"]);

const taskIdSchema = z.string().uuid().brand<"TaskId">();

const taskLogIdSchema = z.string().uuid().brand<"TaskLogId">();

const scheduleSchema = z.object({
  timesOfDay: z
    .array(z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/))
    .optional(),
  daysOfMonth: z.array(z.number().min(1).max(31)).optional(),
  daysOfWeek: z.array(z.number().min(0).max(6)).optional(),
  monthsOfYear: z.array(z.number().min(1).max(12)).optional(),

  startDate: z.date().optional(),
  endDate: z.date().optional(),
});

const timestampedSchema = z.object({
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const taskLogSchema = z
  .object({
    id: taskLogIdSchema,
    type: z.literal("taskLog"),
    notes: z.string().optional(),
    status: taskStatusSchema,
  })
  .merge(timestampedSchema);
export type TaskLog = z.infer<typeof taskLogSchema>;

export const taskSchema = z
  .object({
    id: taskIdSchema,
    parentTaskId: taskIdSchema.optional(),
    type: z.literal("task"),
    taskType: taskTypeSchema.default("task"),

    name: z.string(),
    description: z.string().optional(),

    priority: prioritySchema.optional(),
    color: z.string().optional(),
    tags: z.array(z.string()).optional().default([]),

    logs: z.array(taskLogSchema).optional().default([]),
  })
  .merge(scheduleSchema)
  .merge(timestampedSchema);
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
  id: taskIdSchema,
});
export type DeleteTask = z.infer<typeof deleteTaskSchema>;

export const markTaskSchema = z.object({
  id: taskIdSchema,
  status: taskStatusSchema,
});
export type MarkTask = z.infer<typeof markTaskSchema>;

type ValidationError = { type: "ValidationError" };
type NotFoundError = { type: "NotFoundError" };

export interface TasksStore {
  tasks: Task[];
  createTask(task: CreateTask): Result<Task, ValidationError>;
  updateTask(task: UpdateTask): Result<Task, ValidationError | NotFoundError>;
  deleteTask(task: DeleteTask): Result<void, ValidationError | NotFoundError>;

  markTask(task: MarkTask): Result<Task, ValidationError | NotFoundError>;
}
