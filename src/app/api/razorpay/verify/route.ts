import { NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/server/db";
import { VerifyPaymentSchema } from "@/schemas/order";
import { deserializeUser } from "@/server/api/middleware";
import { env } from "@/env";

export async function POST(req: Request) {
  try {
    const user = await deserializeUser();
    if (!user.user)
      return NextResponse.json(
        { message: "You are not authorized." },
        { status: 401 },
      );
    const reqBody = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      VerifyPaymentSchema.parse(reqBody);
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");
    if (expectedSignature === razorpay_signature) {
      return await db.$transaction(async (tx) => {
        const payment = await tx.payment.findFirstOrThrow({
          where: {
            paymentId: razorpay_order_id,
          },
        });
        await tx.payment.update({
          where: {
            id: payment.id,
          },
          data: {
            isPaymentDone: true,
          },
        });
        await tx.cartItem.deleteMany({
          where: {
            userId: user.user.id,
          },
        });
        return NextResponse.json(
          { message: "Payment successfull!" },
          { status: 200 },
        );
      });
    } else {
      return NextResponse.json(
        { message: "Invalid razorpay signature" },
        { status: 400 },
      );
    }
  } catch (error) {
    NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
  }
}
