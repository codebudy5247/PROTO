import { RouterOutputs } from "@/lib/api";

export type Collections = RouterOutputs["collection"]["list"] | undefined;

export type Product = RouterOutputs["product"]["list"]["products"][0];
