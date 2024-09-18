import { RouterOutputs } from "@/lib/api";
import { Role } from "@prisma/client";

export type Collections = RouterOutputs["collection"]["list"] | undefined;

export type Product = RouterOutputs["product"]["list"]["products"][0];

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  defaultShippingAddress: string | null;
  defaultBillingAddress: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type CartItem = {
  id: string;
  quantity: number;
  userId: string;
  Product: Product;
};
