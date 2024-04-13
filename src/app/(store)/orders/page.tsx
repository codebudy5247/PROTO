import { api } from "@/trpc/server";
import Orders from "./_components/Orders";
import { redirect } from "next/navigation";

const UserOrders = async () => {
  const session = await api.auth.me();
  if (session.user === null) {
    redirect(`/signin`);
  }
  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <div className="flex flex-col sm:gap-4 sm:py-4">
          <Orders />
        </div>
      </div>
    </>
  );
};

export default UserOrders;
