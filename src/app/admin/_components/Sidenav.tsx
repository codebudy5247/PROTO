"use client";
import Link from "next/link";
import { Home, Package, Package2, Users } from "lucide-react";
import { usePathname } from "next/navigation";

const Sidenav = () => {
  const pathname = usePathname();
  
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span className="">Porto</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              href="/admin/dashboard"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${pathname.includes("dashboard") ? "bg-muted text-primary" : ""}`}
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/admin/products"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${pathname.includes("products") ? "bg-muted text-primary" : ""}`}
            >
              <Package className="h-4 w-4" />
              Products{" "}
            </Link>
            <Link
              href="/admin/users"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${pathname.includes("users") ? "bg-muted text-primary" : ""}`}
            >
              <Users className="h-4 w-4" />
              Users
            </Link>
            <Link
              href="/admin/orders"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${pathname.includes("orders") ? "bg-muted text-primary" : ""}`}
            >
              <Users className="h-4 w-4" />
              Orders
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidenav;
