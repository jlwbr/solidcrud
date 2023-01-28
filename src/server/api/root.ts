import { createTRPCRouter } from "./trpc";
import { projectsRouter } from "./routers/projects";
import { connectionsRouter } from "./routers/connections";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  projects: projectsRouter,
  connections: connectionsRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
