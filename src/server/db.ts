import { PrismaClient } from "@prisma/client";

import { env } from "@/env";

const createPrismaClient = () =>
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  }).$extends({
    result: {
      address: {
        formattedAddress: {
          needs: {
            lineOne: true,
            lineTwo: true,
            city: true,
            country: true,
            pincode: true,
          },
          compute: (addre) => {
            return `${addre.lineOne}, ${addre.lineTwo}, ${addre.city}, ${addre.country}-${addre.pincode}`;
          },
        },
      },
    },
  });

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
