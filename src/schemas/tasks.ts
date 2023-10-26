import { z } from "zod";

export const addTaskInputSchema = z.object({
    title: z.string().min(1),
    date: z.string().min(1), // assuming date is a string in ISO format
    notifications: z.any(),
    tag: z.string().optional(),
    isCompleted: z.boolean().optional(),
});

export type AddTaskInputData = z.infer<typeof addTaskInputSchema>;