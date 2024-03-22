import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="fixed bottom-0 w-full border-t bg-slate-100 p-8">
      <div className="mx-auto flex w-full items-center justify-between md:max-w-screen-2xl">
        <Link href="/">
          <div className="pb-4 text-center text-4xl font-bold text-[] sm:pb-0">
            Store
          </div>
        </Link>
        <div className="flex w-full items-center justify-between space-x-4 md:block md:w-auto">
          <Button size="sm" variant="ghost">
            Privacy Policy
          </Button>
          <Button size="sm" variant="ghost">
            Terms of Service
          </Button>
        </div>
      </div>
    </div>
  );
};
