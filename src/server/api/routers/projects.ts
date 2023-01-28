import { TRPCClientError } from "@trpc/client";
import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const projectsRouter = createTRPCRouter({
  getUserProjects: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.projects.findMany({
      where: {
        ownerId: ctx.session.user.id,
      },
    });
  }),
  getProjectBySlug: protectedProcedure.input(z.object({
    slug: z.string(),
  })).query(async ({ ctx, input }) => {
    const project = await ctx.prisma.projects.findUnique({
      where: {
        slug: input.slug,
      },
    });

    if (!project || project.ownerId !== ctx.session.user.id) {
      return null;
    }

    return project;
  }),
  create: protectedProcedure.input(z.object({
    name: z.string(),
    description: z.string().optional(),
    slug: z.string(),
  })).mutation(async ({ ctx, input }) => {
    const project = await ctx.prisma.projects.create({
      data: {
        ...input,
        owner: {
          connect: {
            id: ctx.session.user.id,
          },
        },
      },
    });

    return project;
  }),
});
