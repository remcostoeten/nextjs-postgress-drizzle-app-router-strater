import { z } from "zod";

export const addTaskInputSchema = z.object({
    title: z.string().min(1),
    date: z.string().min(1), // assuming date is a string in ISO format
    weight: z.any().optional(),
    tag: z.string().optional(),
    isCompleted: z.boolean().optional(),
});

export type AddTaskInputData = z.infer<typeof addTaskInputSchema>;