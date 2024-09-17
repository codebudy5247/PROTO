import { z } from "zod";
import { CollectionType, ProductSize, ProductColor } from "@prisma/client";

export const CreateProductSchema = z.object({
  name: z.string({ required_error: "Name is required!" }).min(5),
  description: z.string({ required_error: "Description is required" }).min(5),
  price: z.coerce.number(),
  rate: z.coerce.number(),
  published: z.boolean().default(false).optional(),
  types: z.array(z.nativeEnum(CollectionType)),
  sizes: z.array(z.nativeEnum(ProductSize)),
  colors: z.array(z.nativeEnum(ProductColor)),
  collectionId: z.number(),
  images: z
    .string({ required_error: "Image is required" })
    .array()
    .min(1)
    .max(10),
});
