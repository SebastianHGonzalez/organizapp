import z from "zod";

export const projectSchema = z.object({
  id: z.string().uuid(),
  type: z.literal("project"),
  name: z.string(),
  description: z.string().optional(),
  startDate: z.date(),
  endDate: z.date().optional(),
  status: z.enum(["active", "inactive"]),
});

export type Project = z.infer<typeof projectSchema>;
