"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import OrdersList from "./OrdersList";
import OrderDetails from "./OrderDetails";
import { useEffect, useState } from "react";
import { api } from "@/trpc/react";
import FullScreenLoader from "@/components/FullScreenLoader";

const Orders = () => {
  const { data: orders, isError, isLoading } = api.order.list.useQuery();
  const [selectedOrder, setSelectedOrder] = useState<string | undefined>();

  useEffect(() => {
    if (!selectedOrder && orders && orders.length > 0) {
      setSelectedOrder(orders[0]?.id);
    }
  }, [orders, selectedOrder]);

  if (isLoading) {
    return <FullScreenLoader />
  }

  if (isError) {
    return <div>Error loading orders.</div>;
  }
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <Card x-chunk="dashboard-05-chunk-3">
          <CardHeader className="px-7">
            <CardTitle>Orders</CardTitle>
            <CardDescription>Recent orders from your store.</CardDescription>
          </CardHeader>
          <CardContent>
            <OrdersList
              orders={orders}
              selectedOrder={selectedOrder}
              setSelectedOrder={setSelectedOrder}
            />
          </CardContent>
        </Card>
      </div>
      <div>
      <OrderDetails orderId={selectedOrder} />
      </div>
    </main>
  );
};

export default Orders;
