import { z } from "zod";
import { Result } from "./Store";
import { randomUUID } from "@/lib/crypto";

export const dateStringSchema = z.string().regex(/\d\d\d\d-\d\d-\d\d/);
/**
 * eg. 2025-12-31
 */
type DateString = z.infer<typeof dateStringSchema>;

const targetInstanceSchema = dateStringSchema;
type TargetInstance = z.infer<typeof targetInstanceSchema>;

const taskStatusSchema = z.enum(["completed", "skipped", "not_completed"]);
export type TaskStatus = z.infer<typeof taskStatusSchema>;

const taskTypeSchema = z.enum([
  "task",
  "project",
  "event",
  "routine",
  "goal",
  "budget",
]);
export type TaskType = z.infer<typeof taskTypeSchema>;

const taskLogTypeSchema = z.enum(["status", "expense", "income"]);
export type TaskLogType = z.infer<typeof taskLogTypeSchema>;

const prioritySchema = z.enum(["low", "medium", "high"]);

const taskIdSchema = z.string().uuid().brand<"TaskId">();
export type TaskId = z.infer<typeof taskIdSchema>;

const taskLogIdSchema = z.string().uuid().brand<"TaskLogId">();

const scheduleSchema = z.object({
  timesOfDay: z
    .array(z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/))
    .optional(),
  daysOfMonth: z.array(z.number().min(1).max(31)).optional(),
  daysOfWeek: z.array(z.number().min(0).max(6)).optional(),
  monthsOfYear: z.array(z.number().min(1).max(12)).optional(),

  startDate: dateStringSchema.optional(),
  endDate: dateStringSchema.optional(),
});
const scheduledSchema = z.object({
  schedules: z.array(scheduleSchema).default([])
})

const timestampedSchema = z.object({
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const taskLogSchema = z
  .object({
    id: taskLogIdSchema,
    taskId: taskIdSchema,
    type: z.literal("taskLog"),
    taskLogType: taskLogTypeSchema,
    targetInstance: targetInstanceSchema,
    status: taskStatusSchema.optional().default("completed"),

    notes: z.string().optional(),
    amount: z.number().optional().default(0),
  })
  .merge(timestampedSchema);
export type TaskLog = z.infer<typeof taskLogSchema>;

export const taskSchema = z
  .object({
    id: taskIdSchema,
    type: z.literal("task"),
    taskType: taskTypeSchema.default("task"),

    name: z.string(),

    priority: prioritySchema.optional(),
    color: z.string().optional(),
  })
  .merge(scheduledSchema)
  .merge(timestampedSchema);
export type Task = z.infer<typeof taskSchema>;

export const listTasksForDateSchema = z.object({
  date: dateStringSchema,
});
type ListTasksForDate = z.infer<typeof listTasksForDateSchema>;

export const getTaskSchema = taskSchema.pick({ id: true });
type GetTask = z.infer<typeof getTaskSchema>;

export const createTaskSchema = taskSchema.pick({
  name: true,
}).merge(
  scheduleSchema
);
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
  targetInstance: targetInstanceSchema,
});
export type MarkTask = z.infer<typeof markTaskSchema>;

const taskViewSchema = taskLogSchema.pick({ status: true }).merge(taskSchema);
export type TaskView = z.infer<typeof taskViewSchema>;

type ValidationError = { type: "ValidationError" };
type NotFoundError = { type: "NotFoundError" };

export interface TasksStore {
  tasks: Task[];
  taskLogs: TaskLog[];

  /**
   * @param date format: yyyy-mm-dd eg. 2025-12-31
   */
  listTasksForDate(
    query: ListTasksForDate
  ): Result<TaskView[], ValidationError>;
  getTask(query: GetTask): Result<Task, ValidationError | NotFoundError>;

  createTask(mutation: CreateTask): Result<Task, ValidationError>;
  updateTask(
    mutation: UpdateTask
  ): Result<Task, ValidationError | NotFoundError>;
  deleteTask(
    mutation: DeleteTask
  ): Result<void, ValidationError | NotFoundError>;
  markTask(
    mutation: MarkTask
  ): Result<TaskLog, ValidationError | NotFoundError>;
}

export function createTask(mutation: CreateTask): Task {
  return {
    id: randomUUID() as Task["id"],
    type: "task",
    taskType: "task",
    name: mutation.name,
    color: undefined,
    createdAt: new Date(),
    updatedAt: new Date(),
    schedules: [
      {
        startDate: mutation.startDate,
        endDate: mutation.endDate,
      }
    ]
  };
}

export function createTaskLog(mutation: MarkTask): TaskLog {
  return {
    id: randomUUID() as TaskLog["id"],
    type: "taskLog",
    taskLogType: "status",
    taskId: mutation.id,
    status: mutation.status,
    targetInstance: mutation.targetInstance,
    createdAt: new Date(),
    updatedAt: new Date(),
    amount: 0,
  };
}

export function isTaskLogTarget(taskLog: TaskLog, target: TargetInstance) {
  return taskLog.targetInstance === target;
}

export function isActiveOnDate(task: Task, date: DateString) {
  // TODO: Add days of week criteria
  return task.schedules.some(schedule => isDateBetween(date, schedule.startDate, schedule.endDate));
}

function isDateBetween(
  date: string | number | Date,
  start: string | number | Date = 0,
  end: string | number | Date = 1000000000000000
) {
  const targetTimestamp = getTimestamp(date);
  const startTimestamp = getTimestamp(start);
  const endTimestamp = getTimestamp(end);

  return startTimestamp <= targetTimestamp && targetTimestamp <= endTimestamp;
}

function getTimestamp(date: string | number | Date) {
  if (typeof date === "number") return date;
  if (typeof date === "string") return new Date(date).getTime();
  return date.getTime();
}
