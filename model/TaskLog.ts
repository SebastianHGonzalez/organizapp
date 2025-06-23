import z from "zod";

export const taskLogSchema = z.object({
  id: z.string().uuid(),
  type: z.literal("taskLog"),
  taskId: z.string().uuid(),
  date: z.date(),
  status: z
    .enum(["completed", "skipped", "not_completed"])
    .default("not_completed"),
  notes: z.string().optional(),
  createdAt: z.date(),
});
export type TaskLog = z.infer<typeof taskLogSchema>;

export const createTaskLogSchema = taskLogSchema.pick({
  taskId: true,
  date: true,
  status: true,
  notes: true,
});
export type CreateTaskLog = z.infer<typeof createTaskLogSchema>;

export const updateTaskLogSchema = taskLogSchema.partial();
export type UpdateTaskLog = z.infer<typeof updateTaskLogSchema>;

export const deleteTaskLogSchema = z.object({
  id: z.string().uuid(),
});
export type DeleteTaskLog = z.infer<typeof deleteTaskLogSchema>;
