import { Prisma } from "@prisma/client";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const defaultCollectionSelect =
  Prisma.validator<Prisma.CollectionSelect>()({
    id: true,
    name: true,
    slug: true,
    types: true,
    children: {
      select: {
        id: true,
        name: true,
        slug: true,
        types: true,
      },
    },
  });

export const collectionRouter = createTRPCRouter({
  list: publicProcedure.query(
    async ({ ctx }) =>
      await ctx.db.collection.findMany({
        select: defaultCollectionSelect,
        where: {
          parent: null,
        },
        orderBy: { id: "asc" },
      }),
  ),
});
