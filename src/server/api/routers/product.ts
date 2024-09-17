import { z } from "zod";
import {
  CollectionType,
  Prisma,
  ProductColor,
  ProductSize,
} from "@prisma/client";
import {
  adminProtectedProcedure,
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";
import { defaultCollectionSelect } from "./collection";
import { TRPCError } from "@trpc/server";
import { CreateProductSchema } from "@/schemas/product";

export const defaultProductSelect = Prisma.validator<Prisma.ProductSelect>()({
  id: true,
  name: true,
  description: true,
  price: true,
  rate: true,
  sizes: true,
  colors: true,
  images: {
    select: {
      imageURL: true,
      imageBlur: true,
    },
  },
  types: true,
  collection: {
    select: defaultCollectionSelect,
  },
});

export const productRouter = createTRPCRouter({
  list: publicProcedure
    .input(
      z.object({
        take: z.number(),
        types: z.nativeEnum(CollectionType).optional(),
        slug: z.string().optional(),
        page: z.number().optional(),
        rate: z.number().optional(),
        gte: z.number().optional(),
        lte: z.number().optional(),
        sizes: z.nativeEnum(ProductSize).array().optional(),
        colors: z.nativeEnum(ProductColor).array().optional(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const {
        types = "MEN",
        slug,
        page = 1,
        rate = 0,
        gte = 0,
        lte = 1000000,
        sizes = [],
        colors = [],
      } = input;

      const take = input.take;
      const skip = take * (page - 1);

      const where: Prisma.ProductWhereInput = {
        types: { hasSome: [types] },
        published: true,
        rate: rate ? { gte: rate } : undefined,
        price: { gte, lte },
        sizes: sizes.length > 0 ? { hasSome: sizes } : undefined,
        colors: colors.length > 0 ? { hasSome: colors } : undefined,
      };

      if (slug) {
        const isParent = await ctx.db.collection.findFirst({
          where: {
            slug,
            parent: {
              is: null,
            },
          },
        });

        where.collection = isParent ? { parentId: isParent.id } : { slug };
      }

      const [products, totalCount] = await ctx.db.$transaction([
        ctx.db.product.findMany({
          select: defaultProductSelect,
          where,
          orderBy: { id: "asc" },
          take,
          skip,
        }),
        ctx.db.product.count({ where }),
      ]);

      return {
        products,
        totalCount,
        metadata: {
          hasNextPage: skip + take < totalCount,
          totalPages: Math.ceil(totalCount / take),
        },
      };
    }),
  id: publicProcedure
    .input(z.string().refine((value) => !!value, { message: "ID is required" }))
    .query(async ({ ctx, input }) => {
      const product = await ctx.db.product.findUnique({
        where: { id: input },
        select: defaultProductSelect,
      });
      if (!product) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Product not found",
        });
      }
      return product;
    }),
  // Admin routes
  create: adminProtectedProcedure
    .input(CreateProductSchema)
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.user === null || ctx.user.user.role !== "ADMIN") {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized.",
        });
      }
      const product = await ctx.db.product.create({
        data: {
          name: input.name,
          description: input.description,
          price: input.price,
          rate: input.rate,
          published: input.published,
          types: input.types,
          colors: input.colors,
          sizes: input.sizes,
          collectionId: input.collectionId,
          userId: ctx.user.user.id,
          images: {
            createMany: {
              data: input.images.map((image) => ({
                imageURL: image,
                imageBlur: "",
              })),
            },
          },
        },
      });

      return product;
    }),
});
