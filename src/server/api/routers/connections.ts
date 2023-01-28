import { z } from "zod";
import mysql from "mysql2"
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const connectionsRouter = createTRPCRouter({
  getConnectionsByProjectSlug: protectedProcedure.input(z.object({
    slug: z.string(),
  })).query(async ({ ctx, input: { slug } }) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    return await ctx.prisma.connection.findMany({
      where: {
        project: {
          slug,
        },
      },
      select: {
        id: true,
        name: true,
        type: true,
        host: true,
        port: true,
        username: true,
        database: true,
      }
    });
  }),
  testConnection: protectedProcedure.input(z.object({
    id: z.string(),
  })).mutation(async ({ ctx, input: { id } }) => {
    const credentials = await ctx.prisma.connection.findUnique({
      where: {
        id,
      },
    });

    if (!credentials) {
      throw new Error("Connection not found");
    }

    switch (credentials.type) {
      case "mysql":
        if (!credentials.host || !credentials.port || !credentials.username || !credentials.password || !credentials.database) {
          throw new Error("Missing connection credentials");
        }

        const connection = mysql.createConnection({
          host: credentials.host,
          port: parseInt(credentials.port || "3306", 10),
          user: credentials.username,
          password: credentials.password,
          database: credentials.database,
        });

        return new Promise((resolve, reject) => {
          connection.connect((err) => {
            if (err) {
              reject(err);
            } else {
              resolve(true);
            }
          });
        });
      default:
        throw new Error("Unsupported connection type");
    }
  }),
});
