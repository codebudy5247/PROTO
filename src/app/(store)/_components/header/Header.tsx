"use client";

import Link from "next/link";
import { Collections } from "@/types";
import { LucideIcon } from "lucide-react";
import { Heart, ShoppingBagIcon, User } from "lucide-react";
import { useState } from "react";
import { MegaMenu } from "./MegaMenu";
import { capitalizeFirstLetter } from "@/lib/utils";
import { Search } from "./Search";
import { Button } from "@/components/ui/button";

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

export const sideNavLinks: [string, LucideIcon][] = [
  ["/wishlist", Heart],
  ["/cart", ShoppingBagIcon],
  ["/signin", User],
];

export const Header = ({ collections }: { collections: Collections }) => {
  const [hoveredNavLink, setHoveredNavLink] = useState<NavLink | null>();
  const handleShowMenu = (navLink: NavLink) => setHoveredNavLink(navLink);
  const handleCloseMenu = () => setHoveredNavLink(null);

  return (
    <header>
      <div className="relative h-14 bg-white shadow-md shadow-gray-200">
        <div className="mx-auto flex h-full items-center px-4 xl:container">
          <div className="mr-5 flex shrink-0 items-center">
            <Link href="/">
              <div className="pb-4 text-center text-4xl font-bold text-[] sm:pb-0">
                Store
              </div>
            </Link>
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
            {/* {sideNavLinks.map(([url, Icon]) => (
              <Link key={url} href={url} className="ml-5 hidden md:block">
                <Icon
                  className="text-neutral-700 transition-colors hover:text-violet-700"
                  size="20px"
                />
              </Link>
            ))} */}
            {/* {session && (
            <button
              className="ml-5 hidden rounded-full border border-solid border-violet-700 p-[2px] md:block"
              onClick={() => signOut()}
            >
              {session.user?.image && (
                <Image
                  src={session.user.image}
                  alt="user profile image"
                  width={30}
                  height={30}
                  className="overflow-hidden rounded-full"
                  quality={100}
                />
              )}
            </button>
          )} */}
            <div className="ml-5">
              <Link href="/signin">
              <Button variant="outline">Signin</Button>
              </Link>
              
            </div>
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
