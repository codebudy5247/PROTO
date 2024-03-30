import { RouterOutputs } from "@/lib/api";

export type Collections = RouterOutputs["collection"]["list"] | undefined;

export type Product = RouterOutputs["product"]["list"]["products"][0];


export type User = {
  id: string;
  name: string;
  email: string;
};

export type CartItem = {
  id: string;
  quantity: number;
  userId:string;
  Product: Product;
};
