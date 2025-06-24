import z from "zod";

export const taskScheduleSchema = z.object({
  id: z.string().uuid(),
  type: z.literal("taskSchedule"),
  taskId: z.string().uuid(),
  frequency: z.enum(["once", "daily", "weekly", "monthly", "yearly"]),
  timeOfDay: z.string().optional(),
  daysOfMonth: z.array(z.number()).optional(),
  daysOfWeek: z.array(z.number()).optional(),
  monthOfYear: z.number().optional(),

  startDate: z.date(),
  endDate: z.date().optional(),

  status: z.enum(["active", "inactive"]).default("active"),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
});
export type TaskSchedule = z.infer<typeof taskScheduleSchema>;

export const createTaskScheduleSchema = taskScheduleSchema.pick({
  taskId: true,
  frequency: true,
  timeOfDay: true,
  daysOfMonth: true,
  daysOfWeek: true,
  monthOfYear: true,
  startDate: true,
  endDate: true,
});
export type CreateTaskSchedule = z.infer<typeof createTaskScheduleSchema>;

export const updateTaskScheduleSchema = taskScheduleSchema.partial();
export type UpdateTaskSchedule = z.infer<typeof updateTaskScheduleSchema>;

export const deleteTaskScheduleSchema = z.object({
  taskId: z.string().uuid(),
});
export type DeleteTaskSchedule = z.infer<typeof deleteTaskScheduleSchema>;
