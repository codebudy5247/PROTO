import { db } from "@/server/db";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

const UserPage = () => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <h1 className="text-center text-xl font-semibold md:text-2xl">Users</h1>
      <UsersTable />
    </main>
  );
};

export default UserPage;

async function UsersTable() {
  const users = await db.user.findMany();
  
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="hidden sm:table-cell">User Id</TableHead>
            <TableHead className="hidden sm:table-cell">Name</TableHead>
            <TableHead className="hidden md:table-cell">Email</TableHead>
            <TableHead className="hidden md:table-cell">Role</TableHead>
            <TableHead className="hidden md:table-cell">
              Shipping address
            </TableHead>
            <TableHead className="hidden md:table-cell">
              Billing address
            </TableHead>
            <TableHead className="text-right">Registered on</TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user, index) => (
            <TableRow key={index}>
              <TableCell>{user.id.slice(0, 8)}...</TableCell>
              <TableCell className="hidden sm:table-cell">
                {user.name}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {user.email}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {user.role}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {user.defaultShippingAddress}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {user.defaultBillingAddress}
              </TableCell>
              <TableCell className="text-right">
                {format(user.createdAt, "MM/dd/yyyy")}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
