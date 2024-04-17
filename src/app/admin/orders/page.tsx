import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { db } from "@/server/db";
const OrderPage = () => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <h1 className="text-xl font-semibold md:text-2xl text-center">Orders</h1>
      <OrdersTable />
    </main>
  );
};

export default OrderPage;

async function OrdersTable() {
  const orders = await db.order.findMany({
    select: {
      id: true,
      status: true,
      createdAt: true,
      netAmount: true,
      User: true,
      payment: true,
      products: true,
      event: true,
    },
    orderBy: { createdAt: "asc" },
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden sm:table-cell">Order Id</TableHead>
          <TableHead className="hidden sm:table-cell">Status</TableHead>
          <TableHead className="hidden md:table-cell">Date</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders?.map((order, index) => (
          <TableRow key={index}>
            <TableCell>{order.id.slice(0, 8)}...</TableCell>
            <TableCell className="hidden sm:table-cell">
              <Badge className="text-xs" variant="outline">
                {order.status}
              </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {format(order.createdAt, "MM/dd/yyyy")}
            </TableCell>
            <TableCell className="text-right">
              ₹{order.netAmount.toString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
