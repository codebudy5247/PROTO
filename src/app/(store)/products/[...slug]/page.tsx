import React from "react";
import { Navigation } from "../_components/Navigation";
import { api } from "@/trpc/server";
import { type CollectionType } from "@prisma/client";
import ProductList from "../_components/ProductList";

interface ProductPageProps {
  params: {
    slug: string[] | undefined;
  };
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const { slug } = params as { slug: string[] | undefined };

  const products = await api.product.list({
    types: slug?.[0]?.toUpperCase() as CollectionType,
    slug: slug?.[1],
  });

  return (
    <div className="mx-auto items-center p-4 xl:container">
      <div className="flex gap-5">
        <div className="hidden flex-1 md:block">
          <Navigation />
        </div>
        <div className="flex-[5]">
          <ProductList products={products?.products} />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
