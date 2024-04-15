import { z } from "zod";

const ImagesSchema = z.object({
  imageURL: z.string(),
  imageBlur: z.string(),
});

enum CollectionType {
  MEN = "MEN",
  WOMEN = "WOMEN",
  KIDS = "KIDS",
}

enum ProductSize {
  S = "S",
  M = "M",
  L = "L",
  XL = "XL",
  XXL = "XXL",
  XXXL = "XXXL",
}

enum ProductColor {
  BLACK = "BLACK",
  WHITE = "WHITE",
  GRAY = "GRAY",
  RED = "RED",
  ORANGE = "ORANGE",
  YELLOW = "YELLOW",
  GREEN = "GREEN",
  PINK = "PINK",
  BLUE = "BLUE",
  PURPLE = "PURPLE",
}

export const CreateProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  rate: z.number(),
  published: z.boolean(),
  types: z.array(z.nativeEnum(CollectionType)),
  sizes: z.array(z.nativeEnum(ProductSize)),
  colors: z.array(z.nativeEnum(ProductColor)),
  userId: z.string(),
  collectionId: z.number(),
  images: z.array(ImagesSchema),
});
