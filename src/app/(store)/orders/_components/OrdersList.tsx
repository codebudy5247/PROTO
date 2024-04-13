"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Order } from "@prisma/client";
import { format } from "date-fns";

interface Props {
  orders: Order[] | undefined;
  selectedOrder: string | undefined;
  setSelectedOrder: (orderId: string | undefined) => void;
}

const OrdersList = ({ orders, selectedOrder, setSelectedOrder }: Props) => {
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
          <TableRow
            className={`${selectedOrder === order.id ? "bg-accent" : ""}`}
            key={index}
            onClick={() => setSelectedOrder(order.id)}
          >
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
};

export default OrdersList;
