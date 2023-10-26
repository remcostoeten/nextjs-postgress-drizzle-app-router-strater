import { desc, eq } from "drizzle-orm";
import "server-only";
import { db } from "@/server/db/db";
import { tasks } from "@/server/db/schema";
import { protectedProcedure, router } from "@/server/trpc";
import { addTaskInputSchema } from "@/schemas/tasks";
import { z } from "zod"; // Import z from Zod for defining input schema
import { and } from "drizzle-orm";

// Define the input schema for the updateCompletionStatus mutation
const updateCompletionStatusInputSchema = z.object({
    taskId: z.number(),
    isCompleted: z.boolean(),
});

// Define the input schema for the delete mutation
const deleteTaskInputSchema = z.object({
    taskId: z.number(),
});

export const tasksRouter = router({
    list: protectedProcedure.query(async ({ ctx: { session } }) => {
        return await db.query.tasks.findMany({
            where: eq(tasks.userId, session.user.id),
            orderBy: [desc(tasks.createdAt)],
        });
    }),
    add: protectedProcedure
        .input(addTaskInputSchema)
        .mutation(async ({ input, ctx: { session } }) => {
            await db
                .insert(tasks)
                .values({
                    title: input.title,
                    date: new Date(input.date),
                    notifications: input.notifications,
                    tag: input.tag,
                    userId: session.user.id,
                    isCompleted: input.isCompleted ?? false,
                })
                .execute();
        }),
    updateCompletionStatus: protectedProcedure
        .input(updateCompletionStatusInputSchema)
        .mutation(async ({ input, ctx: { session } }) => {
            const { taskId, isCompleted } = input;
            await db
                .update(tasks)
                .set({ isCompleted: isCompleted })
                .where(
                    and(
                        eq(tasks.id, taskId),
                        eq(tasks.userId, session.user.id)
                    )
                )
                .execute();
            return {
                success: true,
                message: 'Completion status updated successfully',
            };
        }),
    delete: protectedProcedure
        .input(deleteTaskInputSchema)
        .mutation(async ({ input, ctx: { session } }) => {
            const { taskId } = input;
            await db
                .delete(tasks)
                .where(and(eq(tasks.id, taskId), eq(tasks.userId, session.user.id)))
                .execute();
            return {
                success: true,
                message: 'Task deleted successfully',
            };
        }),
});