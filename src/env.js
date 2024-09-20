import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z
      .string()
      .url()
      .refine(
        (str) => !str.includes("YOUR_POSTGRESQL_URL_HERE"),
        "You forgot to change the default URL"
      ),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    JWT_SECRET:z.string().min(1),
    RAZORPAY_KEY_ID:z.string().min(1),
    RAZORPAY_KEY_SECRET:z.string().min(1),
  },
  client: {
    // NEXT_PUBLIC_ADMIN_EMAIL:z.string().min(1),
    // NEXT_PUBLIC_ADMIN_PASSWORD:z.string().min(1),
    // NEXT_PUBLIC_RAZORPAY_KEY_ID:z.string().min(1)
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    JWT_SECRET:process.env.JWT_SECRET,
    RAZORPAY_KEY_ID:process.env.RAZORPAY_KEY_ID,
    RAZORPAY_KEY_SECRET:process.env.RAZORPAY_KEY_SECRET,
    // NEXT_PUBLIC_ADMIN_EMAIL:process.env.ADMIN_EMAIL,
    // NEXT_PUBLIC_ADMIN_PASSWORD:process.env.ADMIN_PASSWORD,
    // NEXT_PUBLIC_RAZORPAY_KEY_ID:process.env.RAZORPAY_KEY_ID

  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
