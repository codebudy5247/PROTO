import { api } from "@/trpc/server";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

export default async function AuthProvider({ children }: Props) {
  const session = await api.auth.me();

  if (session?.user?.role !== "ADMIN") {
    redirect("/");
  }

  return <div>{children}</div>;
}
