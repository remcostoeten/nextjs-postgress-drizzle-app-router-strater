import { desc, eq } from "drizzle-orm";
import "server-only";

import { db } from "@/server/db/db";
import { tasks } from "@/server/db/schema"; // make sure to import tasks and tasksRelations from your schema file
import { protectedProcedure, router } from "@/server/trpc";
import { addTaskInputSchema } from "@/schemas/tasks";

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
                    userId: session.user.id 
                })
                .execute();
        }),
});