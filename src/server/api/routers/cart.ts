import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { Prisma, type Product } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import {
  CreateCartSchema,
  ChangeQuantitySchema,
  DeleteCartSchema,
} from "@/schemas/cart";
import { defaultProductSelect } from "./product";

const defaultCartSelect = Prisma.validator<Prisma.CartItemSelect>()({
  id: true,
  quantity:true,
  userId:true,
  Product: {
    select: defaultProductSelect,
  },
});

export const cartRouter = createTRPCRouter({
  addItem: protectedProcedure
    .input(CreateCartSchema)
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.user === null) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized.",
        });
      }
      let product: Product;
      try {
        product = await ctx.db.product.findFirstOrThrow({
          where: {
            id: input.productId,
          },
        });
      } catch (error) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Product not found.",
        });
      }
      let userCart;
      try {
        userCart = await ctx.db.user.findFirstOrThrow({
          where: {
            id: ctx.user.user?.id,
          },
          include: {
            cartItems: true,
          },
        });
      } catch (error) {
        throw new TRPCError({
          code: "NOT_FOUND",
        });
      }
      const existingCartItem = userCart.cartItems.find(
        (item) => item.productId === product.id,
      );
      if (existingCartItem) {
        const updatedCartItem = await ctx.db.cartItem.update({
          where: {
            id: existingCartItem.id,
          },
          data: {
            quantity: existingCartItem.quantity + input.quantity,
          },
        });
        return updatedCartItem;
      } else {
        const newCartItem = await ctx.db.cartItem.create({
          data: {
            userId: ctx.user.user.id,
            productId: product.id,
            quantity: input.quantity,
          },
        });
        return newCartItem;
      }
    }),
  changeQuantity: protectedProcedure
    .input(ChangeQuantitySchema)
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.user === null) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized.",
        });
      }
      const updatedCart = await ctx.db.cartItem.update({
        where: {
          id: input.cartId,
        },
        data: {
          quantity: input.quantity,
        },
      });
      return updatedCart;
    }),
  list: protectedProcedure.query(async ({ ctx}) => {
    if (ctx.user.user === null) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You are not authorized.",
      });
    }
    const cart = await ctx.db.cartItem.findMany({
      select: defaultCartSelect,
      orderBy: { id: "asc" },
      where: {
        userId: ctx.user.user.id,
      },
    });
    const cartItemCount = await ctx.db.cartItem.count({
      where: {
        userId: ctx.user.user.id,
      },
    });
    return {
      cartItemCount: cartItemCount,
      cart,
    };
  }),
  deleteItem: protectedProcedure
    .input(DeleteCartSchema)
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.user === null) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized.",
        });
      }
      await ctx.db.cartItem.delete({
        where: {
          id: input.cartId,
        },
      });
      return { success: true };
    }),
});
