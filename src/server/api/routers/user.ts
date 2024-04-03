import { type Address } from "@prisma/client";
import {
  adminProtectedProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import {
  AddressSchema,
  DeleteAddressSchema,
  GetUserSchema,
  UpdateUserRoleSchema,
  UpdateUserSchema,
} from "@/schemas/user";
import { TRPCError } from "@trpc/server";

const checkAuthorization = (userRole: string) => {
  if (userRole !== "ADMIN") {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You are not authorized.",
    });
  }
};

export const userRouter = createTRPCRouter({
  add: protectedProcedure
    .input(AddressSchema)
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.user === null) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized.",
        });
      }
      const address = await ctx.db.address.create({
        data: {
          ...input,
          userId: ctx.user.user.id,
        },
      });
      return address;
    }),

  list: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.user === null) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You are not authorized.",
      });
    }

    const addresses = await ctx.db.address.findMany({
      where: {
        userId: ctx.user.user.id,
      },
    });
    return addresses;
  }),
  update: protectedProcedure
    .input(UpdateUserSchema)
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.user === null) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized.",
        });
      }
      let shippingAddress: Address;
      let billingAddress: Address;
      if (input.defaultShippingAddress) {
        try {
          shippingAddress = await ctx.db.address.findFirstOrThrow({
            where: {
              id: input.defaultShippingAddress,
            },
          });
        } catch (error) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Address not found",
          });
        }
        if (shippingAddress.userId != ctx.user.user.id) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Address does not belong to user",
          });
        }
      }
      if (input.defaultBillingAddress) {
        try {
          billingAddress = await ctx.db.address.findFirstOrThrow({
            where: {
              id: input.defaultBillingAddress,
            },
          });
        } catch (error) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Address not found",
          });
        }
        if (billingAddress.userId != ctx.user.user.id) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Address does not belong to user",
          });
        }
      }
      const updatedUser = await ctx.db.user.update({
        where: {
          id: ctx.user.user.id,
        },
        data: input,
      });
      return updatedUser;
    }),

  delete: protectedProcedure
    .input(DeleteAddressSchema)
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.user === null) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized.",
        });
      }
      try {
        await ctx.db.address.delete({
          where: {
            id: input.addressId,
          },
        });
        return { success: true };
      } catch (error) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Address not found",
        });
      }
    }),

  /**
   * ADMIN ===============================================================================
   */
  checkAdmin: adminProtectedProcedure.query(() => {
    return "you are authorized";
  }),
  listUsers: protectedProcedure.query(async ({ ctx }) => {
    // checkAuthorization(ctx.user.user?.role!);
    const count = await ctx.db.user.count();
    const users = await ctx.db.user.findMany();
    return {
      count,
      data: users,
    };
  }),
  getUserById: protectedProcedure
    .input(GetUserSchema)
    .query(async ({ ctx, input }) => {
      // checkAuthorization(ctx.user.user?.role!);
      try {
        const user = await ctx.db.user.findFirstOrThrow({
          where: {
            id: input.userId,
          },
          include: {
            addresses: true,
          },
        });
        return user;
      } catch (error) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }
    }),
  changeUserRole: protectedProcedure
    .input(UpdateUserRoleSchema)
    .mutation(async ({ ctx, input }) => {
      // checkAuthorization(ctx.user.user?.role!);
      try {
        const user = await ctx.db.user.update({
          where: {
            id: input.userId,
          },
          data: {
            role: input.role,
          },
        });
        return user;
      } catch (error) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }
    }),
});
