import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const orderRouter = createTRPCRouter({
  // create: protectedProcedure.mutation(async ({ ctx }) => {
  //   if (ctx.user.user === null) {
  //     throw new TRPCError({
  //       code: "UNAUTHORIZED",
  //       message: "You are not authorized.",
  //     });
  //   }
  //   return await ctx.db.$transaction(async (tx) => {
  //     const cartItems = await tx.cartItem.findMany({
  //       select: defaultCartSelect,
  //       where: {
  //         userId: ctx.user.user?.id,
  //       },
  //     });
  //     const price = cartItems.reduce((prev, current) => {
  //       return prev + current.quantity * +current.Product.price;
  //     }, 0);
  //     const address = await tx.address.findFirst({
  //       where: {
  //         id: ctx.user.user?.defaultShippingAddress!,
  //       },
  //     });
  //     const order = await tx.order.create({
  //       data: {
  //         userId: ctx.user.user?.id!,
  //         netAmount: price,
  //         address: address?.formattedAddress!,
  //         products: {
  //           create: cartItems.map((cart) => {
  //             return {
  //               productId: cart.Product.id,
  //               quantity: cart.quantity,
  //               size: cart.size,
  //               color: cart.color,
  //             };
  //           }),
  //         },
  //       },
  //     });
  //     await tx.orderEvent.create({
  //       data: {
  //         orderId: order.id,
  //       },
  //     });
  //     return order;
  //   });
  // }),
  list: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.user === null) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You are not authorized.",
      });
    }
    const orders = await ctx.db.order.findMany({
      where: {
        userId: ctx.user.user.id,
      },
    });
    return orders;
  }),
  cancel: protectedProcedure
    .input(
      z
        .string()
        .refine((value) => !!value, { message: "Order ID is required" }),
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.user === null) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized.",
        });
      }
      return await ctx.db.$transaction(async (tx) => {
        const order = await tx.order.update({
          where: {
            id: input,
          },
          data: {
            status: "CANCELLED",
          },
        });
        await tx.orderEvent.create({
          data: {
            orderId: order.id,
            status: "CANCELLED",
          },
        });
        return order;
      });
    }),
  // generateRazorpayOrder: protectedProcedure
  //   .input(
  //     z
  //       .string()
  //       .refine((value) => !!value, { message: "Order ID is required" }),
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     if (ctx.user.user === null) {
  //       throw new TRPCError({
  //         code: "UNAUTHORIZED",
  //         message: "You are not authorized.",
  //       });
  //     }
  //     const order = await ctx.db.order.findFirstOrThrow({
  //       where: {
  //         id: input,
  //       },
  //     });
  //     let razorpayInstance = new Razorpay({
  //       key_id: process.env.RAZORPAY_KEY_ID!,
  //       key_secret: process.env.RAZORPAY_KEY_SECRET,
  //     });
  //     const orderOptions = {
  //       amount: Number(order.netAmount) * 100, // in paisa
  //       currency: "INR",
  //       receipt: `order_rcptid_${input.slice(0, 3)}`,
  //     };
  //     razorpayInstance.orders.create(
  //       orderOptions,
  //       async function (err, razorpayOrder) {
  //         if (razorpayOrder) {
  //           await ctx.db.payment.create({
  //             data: {
  //               paymentProvider: "RAZORPAY",
  //               paymentId: razorpayOrder.id,
  //               orderId: input,
  //             },
  //           });
  //           return razorpayOrder;
  //         } else {
  //           console.error("RAZORPAY ORDER CREATION ERROR: ", err);
  //         }
  //       },
  //     );
  //   }),

  // verifyPayment: protectedProcedure
  //   .input(VerifyPaymentSchema)
  //   .mutation(async ({ ctx, input }) => {
  //     if (ctx.user.user === null) {
  //       throw new TRPCError({
  //         code: "UNAUTHORIZED",
  //         message: "You are not authorized.",
  //       });
  //     }
  //     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
  //       input;
  //     let body = razorpay_order_id + "|" + razorpay_payment_id;

  //     let expectedSignature = crypto
  //       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
  //       .update(body.toString())
  //       .digest("hex");
  //     if (expectedSignature === razorpay_signature) {
  //       try {
  //         let payment = await ctx.db.payment.findFirstOrThrow({
  //           where: {
  //             paymentId: razorpay_order_id,
  //           },
  //         });
  //         await ctx.db.payment.update({
  //           where: {
  //             id: payment.id,
  //           },
  //           data: {
  //             isPaymentDone: true,
  //           },
  //         });
  //         return { verified: true };
  //       } catch (error) {
  //         throw new TRPCError({
  //           code: "NOT_FOUND",
  //           message: "Payment not found!",
  //         });
  //       }
  //     }
  //   }),
});
