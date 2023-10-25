import "server-only";

import { router } from "@/server/trpc";
import { todosRouter } from "./todos/router";
import { tasksRouter } from "./tasks/router";

export const apiRouter = router({
  todos: todosRouter,
  tasks: tasksRouter,
});

export type ApiRouter = typeof apiRouter;
