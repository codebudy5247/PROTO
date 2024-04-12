import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { deserializeUser } from "@/server/api/middleware";
import { defaultCartSelect } from "@/server/api/routers/cart";

export async function POST(req: Request) {
  try {
    const user = await deserializeUser();
    if (!user.user)
      return NextResponse.json(
        { message: "You are not authorized." },
        { status: 401 },
      );

    const defaultShippingAddressId = user.user.defaultShippingAddress;
    if (!defaultShippingAddressId)
      return NextResponse.json(
        { message: "Default shipping address not found." },
        { status: 401 },
      );

    const address = await db.address.findFirst({
      where: {
        id: defaultShippingAddressId,
      },
    });
    if (!address)
      return NextResponse.json(
        { message: "Address not found." },
        { status: 401 },
      );

    return await db.$transaction(async (tx) => {
      const cartItems = await tx.cartItem.findMany({
        select: defaultCartSelect,
        where: {
          userId: user.user?.id,
        },
      });
      const price = cartItems.reduce((prev, current) => {
        return prev + current.quantity * +current.Product.price;
      }, 0);

      const order = await tx.order.create({
        data: {
          userId: user.user.id,
          netAmount: price,
          address: address.formattedAddress,
          products: {
            create: cartItems.map((cart) => {
              return {
                productId: cart.Product.id,
                quantity: cart.quantity,
                size: cart.size,
                color: cart.color,
              };
            }),
          },
        },
      });

      await tx.orderEvent.create({
        data: {
          orderId: order.id,
        },
      });

      return NextResponse.json(order);
    });
  } catch (error) {
    NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
  }
}
