import { z } from "zod";

export const AddressSchema = z.object({
  lineOne: z.string(),
  lineTwo: z.string(),
  pincode: z.string().length(6),
  country: z.string(),
  city: z.string(),
});

export const UpdateUserSchema = z.object({
  name: z.string().optional(),
  defaultShippingAddress: z.string().optional(),
  defaultBillingAddress: z.string().optional(),
});

export const DeleteAddressSchema = z.object({
  addressId: z.string().min(1),
});
export const GetUserSchema = z.object({
  userId: z.string().min(1),
});
export const UpdateUserRoleSchema = z.object({
  userId: z.string().min(1),
  role: z.enum(["ADMIN", "USER"]),
});


