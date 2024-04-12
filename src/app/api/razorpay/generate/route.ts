import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { z } from "zod";
import { db } from "@/server/db";
import { deserializeUser } from "@/server/api/middleware";

const InputSchema = z.object({
  orderId: z.string().min(1, "ID is required"),
});

export async function POST(req: Request) {
  try {
    const user = await deserializeUser();
    if (!user.user)
      return NextResponse.json(
        { message: "You are not authorized." },
        { status: 401 },
      );
    const body = await req.json();
    const { orderId } = InputSchema.parse(body);
    const order = await db.order.findFirstOrThrow({
      where: {
        id: orderId,
      },
    });
    if (!orderId) {
      return NextResponse.json(
        { success: false, message: "Order not found!" },
        { status: 404 },
      );
    }
    const razorpayInstance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    const orderOptions = {
      amount: Number(order.netAmount) * 100, // in paisa
      currency: "INR",
      receipt: `order_rcptid_${orderId.slice(0, 3)}`,
    };
    const razorpayOrder = await razorpayInstance.orders.create(orderOptions);
    if (!razorpayOrder)
      return NextResponse.json(
        { message: "Something went wrong" },
        { status: 400 },
      );
    if (razorpayOrder) {
      await db.payment.create({
        data: {
          paymentProvider: "RAZORPAY",
          paymentId: razorpayOrder.id,
          orderId: orderId,
        },
      });
    }
    return NextResponse.json(razorpayOrder);
  } catch (error) {
    NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
  }
}

/**
 * Response:
 {
  "id": "order_NxFxoYs6zFG6Nj",
  "entity": "order",
  "amount": 3600,
  "amount_paid": 0,
  "amount_due": 3600,
  "currency": "INR",
  "receipt": "order_rcptid_301",
  "offer_id": null,
  "status": "created",
  "attempts": 0,
  "notes": [],
  "created_at": 1712825678
}
 */