import { useMutation } from "@tanstack/react-query";
import { useDBContext } from "@/db/provider";

export function useCreateTask() {
    const {db, schema} = useDBContext();
    return useMutation({
        mutationKey: ["createTask"],
        mutationFn: (task: typeof schema.tasks.$inferInsert) => db.insert(schema.tasks).values(task).returning(),
    });
}
