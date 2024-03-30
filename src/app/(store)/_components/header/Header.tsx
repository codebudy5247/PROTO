"use client";

import Link from "next/link";
import { Collections } from "@/types";
import { LucideIcon } from "lucide-react";
import Logo from "@/components/Logo";
import { Heart, ShoppingBagIcon, User } from "lucide-react";
import { useState } from "react";
import { MegaMenu } from "./MegaMenu";
import { capitalizeFirstLetter } from "@/lib/utils";
import { Search } from "./Search";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { UserMenu } from "./UserMenu";

export interface NavLink {
  name: "men" | "women" | "kids" | "sale" | "blog" | "contacts";
  href: string;
  collapsible?: boolean;
}

export const navLinks: NavLink[] = [
  { name: "men", href: "/products/men", collapsible: true },
  { name: "women", href: "/products/women", collapsible: true },
  { name: "kids", href: "/products/kids" },
  // { name: "sale", href: "/sale" },
  // { name: "blog", href: "/blog" },
  // { name: "contacts", href: "/contacts" },
];

export const sideNavLinks: [string, LucideIcon][] = [
  // ["/wishlist", Heart],
  ["/cart", ShoppingBagIcon],
];

export const Header = ({ collections }: { collections: Collections }) => {
  const [hoveredNavLink, setHoveredNavLink] = useState<NavLink | null>();
  const handleShowMenu = (navLink: NavLink) => setHoveredNavLink(navLink);
  const handleCloseMenu = () => setHoveredNavLink(null);

  const { data: session } = api.auth.me.useQuery();
  const { data: userCart } = api.cart.list.useQuery(); // TODO: Skip this query when user session == null

  return (
    <header>
      <div className="relative h-14 bg-white shadow-md shadow-gray-200">
        <div className="mx-auto flex h-full items-center px-4 xl:container">
          <div className="mr-5 flex shrink-0 items-center">
            <Logo />
          </div>
          <ul className="ml-auto hidden h-full md:flex">
            {navLinks.map((item, index) => (
              <li
                className={`font-medium text-neutral-700 transition-colors ${
                  hoveredNavLink === item && "bg-violet-100 text-violet-700"
                }`}
                key={index}
                onMouseEnter={() => handleShowMenu(item)}
                onMouseLeave={handleCloseMenu}
              >
                <Link
                  href={item.href}
                  className="flex h-full items-center px-5"
                  onClick={handleCloseMenu}
                >
                  {capitalizeFirstLetter(item.name)}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="ml-auto items-center md:flex">
            <Search onSearch={(value) => console.log(value)} />
            {session?.user && (
              <div className="m-auto flex items-center gap-2">
                {sideNavLinks.map(([url, Icon]) => (
                  <>
                    <Link href="/cart">
                      <div className="relative cursor-pointer">
                        <Icon
                          className="text-neutral-700 transition-colors hover:text-violet-700"
                          size="30px"
                        />
                        <div className="absolute right-0 top-0 grid h-[18px] w-[18px] -translate-y-1 translate-x-1 place-items-center rounded-full bg-violet-700 text-[12px] text-white">
                          {userCart?.cartItemCount}
                        </div>
                      </div>
                    </Link>
                  </>
                ))}
                <UserMenu user={session?.user} />
              </div>
            )}

            {!session?.user && (
              <div className="ml-5">
                <Link href="/signin">
                  <Button variant="outline">Signin</Button>
                </Link>
              </div>
            )}
          </ul>
        </div>
        {hoveredNavLink && (
          <MegaMenu
            type={hoveredNavLink.name === "men" ? "MEN" : "WOMEN"}
            collections={collections}
            onShowMenu={() => handleShowMenu(hoveredNavLink)}
            onCloseMenu={handleCloseMenu}
          />
        )}
      </div>
    </header>
  );
};
