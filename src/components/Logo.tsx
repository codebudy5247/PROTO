import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/">
      <div className="items-center gap-x-2 transition hover:opacity-75 md:flex">
        <Image src="/assets/logo.png" alt="Logo" height={80} width={80} />
      </div>
    </Link>
  );
};

export default Logo;
