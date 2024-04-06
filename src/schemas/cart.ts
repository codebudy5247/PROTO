import { z } from "zod";

export const CreateCartSchema = z.object({
  productId: z.string(),
  quantity: z.number(),
  size:z.string(),
  color:z.string()
});

export const ChangeQuantitySchema = z.object({
  cartId:z.string(),
  quantity: z.number(),
});

export const DeleteCartSchema = z.object({
  cartId:z.string(),
});

