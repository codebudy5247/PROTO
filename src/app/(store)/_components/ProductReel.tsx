import Link from "next/link";
import React from "react";
import { Product } from "@/types";
import ProductItem from "../products/_components/ProductItem";

interface ProductReelProps {
  title: string;
  subtitle?: string;
  href?: string;
  products: Product[] | undefined;
}
const ProductReel = ({ title, subtitle, href, products }: ProductReelProps) => {
  return (
    <section className="py-6">
      <div className="mb-4 md:flex md:items-center md:justify-between">
        <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
          {title ? (
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {title}
            </h1>
          ) : null}
          {subtitle ? (
            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          ) : null}
        </div>

        {href ? (
          <Link
            href={href}
            className="hidden text-sm font-medium text-blue-600 hover:text-blue-500 md:block"
          >
            Shop the collection <span aria-hidden="true">&rarr;</span>
          </Link>
        ) : null}
      </div>

      <div className="relative">
        <div className="mt-6 flex w-full items-center">
          <div className="grid w-full grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
            {products?.map((product) => (
              <div key={product.id}>
                <ProductItem {...product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductReel;
