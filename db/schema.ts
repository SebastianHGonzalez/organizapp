import { sqliteTable, text, type SQLiteTableWithColumns } from "drizzle-orm/sqlite-core";

const tasksTable = sqliteTable("tasks", {
    id: text().primaryKey(),
    parentTaskId: text(),
    taskType: text({
        enum: ["task", "project", "goal", "habit", "note"],
    }).notNull().default("task"),
    name: text().notNull(),
    description: text(),

    timesOfDay: text({
        mode: "json"
    }),
    daysOfMonth: text({
        mode: "json"
    }),
    daysOfWeek: text({
        mode: "json"
    }),
    monthsOfYear: text({
        mode: "json"
    }),
    startDate: text(),
    endDate: text(),
    priority: text({
        enum: ["low", "medium", "high"],
    }),
    color: text(),
    tags: text({
        mode: "json"
    }),
});

const taskLogsTable = sqliteTable("task_logs", {
    id: text().primaryKey(),
    taskId: text().notNull().references(() => tasksTable.id),
    date: text().notNull(),
    status: text().notNull().default("not_completed"),
    notes: text(),
    createdAt: text().notNull(),
    updatedAt: text(),
});

export const schema = {
    tasks: tasksTable,
    taskLogs: taskLogsTable,
} as const;
