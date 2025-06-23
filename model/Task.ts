import { z } from "zod";

export const taskSchema = z.object({
  id: z.string().uuid(),
  type: z.literal("task"),
  name: z.string(),
  description: z.string().optional(),

  startDate: z.date(),
  endDate: z.date().optional(),

  priority: z.enum(["low", "medium", "high"]),
  tags: z.array(z.string()).optional(),
  projectId: z.string().uuid().optional(),

  repeat: z
    .discriminatedUnion("type", [
      z.object({
        type: z.literal("daily"),
        time: z.string().optional(),
      }),
      z.object({
        type: z.literal("weekly"),
        days: z.array(
          z.enum([
            "sunday",
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
          ]),
        ),
        time: z.string().optional(),
      }),
      z.object({
        type: z.literal("monthly"),
        day: z.number(),
        time: z.string().optional(),
      }),
      z.object({
        type: z.literal("yearly"),
        day: z.number(),
        month: z.number(),
        time: z.string().optional(),
      }),
    ])
    .optional(),

  status: z.enum(["active", "inactive"]),
  createdAt: z.date(),
  updatedAt: z.date(),
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
