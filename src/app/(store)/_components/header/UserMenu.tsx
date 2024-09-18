"use client";
import { LogOut, ShoppingBagIcon, User as UserIcon } from "lucide-react";
import { User } from "@/types";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { api } from "@/trpc/react";
import toast from "react-hot-toast";

interface Props {
  user: User;
  refetchSession: () => void;
}

export function UserMenu({ user, refetchSession }: Props) {
  const { mutate: LogoutFn } = api.auth.logout.useMutation({
    onSuccess: async (data) => {
      refetchSession();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{user?.name}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <Link href="/cart">
            <DropdownMenuItem>
              <ShoppingBagIcon className="mr-2 h-4 w-4" />
              <span>Cart</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/orders">
            <DropdownMenuItem>
              <ShoppingBagIcon className="mr-2 h-4 w-4" />
              <span>Orders</span>
            </DropdownMenuItem>
          </Link>
          {user.role === "ADMIN" && (
            <Link href="/admin/dashboard">
              <DropdownMenuItem>
                <UserIcon className="mr-2 h-4 w-4" />
                <span>Admin</span>
              </DropdownMenuItem>
            </Link>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => LogoutFn()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
