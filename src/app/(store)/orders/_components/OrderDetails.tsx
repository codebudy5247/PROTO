"use client";
import { Separator } from "@/components/ui/separator";
import { CircleCheckBig, CircleX, Copy, CreditCard, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/trpc/react";
import { format } from "date-fns";
import { useState } from "react";
import OrderTrackModel from "./OrderTrackModel";

interface Props {
  orderId: string | undefined;
}

const OrderDetails = ({ orderId }: Props) => {
  const { data: order, isLoading, isError } = api.order.byId.useQuery(orderId!);
  const [showOrderTrackModal, setShowOrderTrackModal] =
    useState<boolean>(false);

  if (isError || !order) {
    return <div>Error loading order data...</div>;
  }
  return (
    <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
      {isLoading && <div>Loading...</div>}
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            Order {order?.id.slice(0, 8)}
            <Button
              size="icon"
              variant="outline"
              className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <Copy className="h-3 w-3" />
              <span className="sr-only">Copy Order ID</span>
            </Button>
          </CardTitle>
          {order && (
            <CardDescription>
              Date: {format(order.createdAt, "MM/dd/yyyy")}
            </CardDescription>
          )}
        </div>
        <div className="ml-auto flex items-center gap-1">
          <Button
            onClick={() => setShowOrderTrackModal(true)}
            size="sm"
            variant="outline"
            className="h-8 gap-1"
          >
            <Truck className="h-3.5 w-3.5" />
            <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
              Track Order
            </span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          <div className="font-semibold">Order Details</div>
          {order?.products.map((product, index) => (
            <ul className="grid gap-3" key={index}>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  {product.Product.name}{" "}
                  <span className="font-semibold">
                    ₹{product.Product.price}
                  </span>{" "}
                  <span className="font-semibold">{product.quantity}</span>
                </span>
                <span className="font-semibold">
                  ₹{product.Product.price * product.quantity}
                </span>
              </li>
            </ul>
          ))}
          <Separator className="my-2" />
          <ul className="grid gap-3">
            {/* <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>$299.00</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>$5.00</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Tax</span>
              <span>$25.00</span>
            </li> */}
            <li className="flex items-center justify-between font-semibold">
              <span className="text-muted-foreground">Total</span>
              <span>₹{order?.netAmount.toString()}</span>
            </li>
          </ul>
        </div>
        <Separator className="my-4" />
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-3">
            <div className="font-semibold">Shipping Information</div>
            <address className="grid gap-0.5 not-italic text-muted-foreground">
              <span>{order?.address}</span>
            </address>
          </div>
          <div className="grid auto-rows-max gap-3">
            <div className="font-semibold">Billing Information</div>
            <div className="text-muted-foreground">
              Same as shipping address
            </div>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Customer Information</div>
          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Customer</dt>
              <dd>{order?.User.name}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Email</dt>
              <dd>
                <a href="mailto:">{order?.User.email}</a>
              </dd>
            </div>
            {/* <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Phone</dt>
              <dd>
                <a href="tel:">+1 234 567 890</a>
              </dd>
            </div> */}
          </dl>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Payment Information</div>
          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              <dt className="flex items-center gap-1 text-muted-foreground">
                <CreditCard className="h-4 w-4" />
                Transaction Id
              </dt>
              <dd>{order?.payment.map((tx) => tx.paymentId)}</dd>
            </div>
          </dl>
          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              <dt className="flex items-center gap-1 text-muted-foreground">
                <CreditCard className="h-4 w-4" />
                Status
              </dt>
              <dd>
                {order?.payment.map((tx) => (
                  <>
                    {tx.isPaymentDone ? (
                      <CircleCheckBig color="green" size={20} />
                    ) : (
                      <CircleX color="red" size={20} />
                    )}
                  </>
                ))}
              </dd>
            </div>
          </dl>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <Button variant="destructive">Cancel order</Button>
        </div>
      </CardContent>
      <OrderTrackModel
        showModal={showOrderTrackModal}
        setShowModal={setShowOrderTrackModal}
        event={order.event}
      />
    </Card>
  );
};

export default OrderDetails;
