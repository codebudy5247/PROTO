"use client";

import Link from "next/link";
import { Collections } from "@/types";
import Logo from "@/components/Logo";
import { useState } from "react";
import { MegaMenu } from "./MegaMenu";
import { capitalizeFirstLetter } from "@/lib/utils";
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
  { name: "sale", href: "/sale" },
  { name: "blog", href: "/blog" },
  { name: "contacts", href: "/contacts" },
];

export const Header = ({ collections }: { collections: Collections }) => {
  const [hoveredNavLink, setHoveredNavLink] = useState<NavLink | null>();
  const handleShowMenu = (navLink: NavLink) => setHoveredNavLink(navLink);
  const handleCloseMenu = () => setHoveredNavLink(null);

  const { data: session } = api.auth.me.useQuery();

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
            {session?.user && (
              <div className="m-auto flex items-center gap-2">
                <UserMenu user={session?.user} />
              </div>
            )}

            {!session?.user && (
              <div className="ml-5">
                <Link href="/signin">
                  <Button variant="default">Signin</Button>
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
