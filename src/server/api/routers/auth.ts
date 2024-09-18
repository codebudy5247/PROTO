import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { RegisterSchema, LoginSchema } from "@/schemas/auth";
import { TRPCError } from "@trpc/server";

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(RegisterSchema)
    .mutation(async ({ ctx, input }) => {
      let user = await ctx.db.user.findFirst({ where: { email: input.email } });
      if (user) throw Error("User already exists");
      user = await ctx.db.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: hashSync(input.password, 10),
        },
      });
      return user;
    }),

  login: publicProcedure.input(LoginSchema).mutation(async ({ ctx, input }) => {
    const user = await ctx.db.user.findFirst({ where: { email: input.email } });
    if (!user) throw Error("User not found");
    if (!compareSync(input.password, user.password))
      throw Error("Incorrect password");
    const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET!, {
      expiresIn: 60 * 60,
    });
    const cookieOptions = {
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60,
    };
    cookies().set("token", token, cookieOptions);
    return {
      user,
      token,
    };
  }),
  me: protectedProcedure.query(({ ctx }) => {
    try {
      return ctx.user;
    } catch (err) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Not authorized to perform this action.",
      });
    }
  }),
  logout: protectedProcedure.mutation(() => {
    try {
      cookies().delete("token");
      return { success: true };
    } catch (err) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong!!!.",
      });
    }
  }),
});
