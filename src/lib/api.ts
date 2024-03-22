import { type AppRouter } from "@/server/api/root";
import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server';

export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;