import React from "react";
import { api } from "@/trpc/server";
import { ProductSize, type CollectionType, ProductColor } from "@prisma/client";
import ProductList from "../_components/ProductList";

interface ProductPageProps {
  params: {
    slug: string[] | undefined;
  };
  searchParams: {
    sizes: string | string[] | undefined;
    colors: string | string[] | undefined;
    page: number | undefined;
    price: string | undefined;
    rate: number | undefined;
  };
}

const ProductPage: React.FC<ProductPageProps> = async ({
  params,
  searchParams,
}) => {
  const { slug } = params as { slug: string[] | undefined };

  const products = await api.product.list({
    take:10,
    types: slug?.[0]?.toUpperCase() as CollectionType,
    slug: slug?.[1],
    sizes: [searchParams.sizes].flat(1).filter(Boolean) as ProductSize[],
    colors: [searchParams.colors].flat(1).filter(Boolean) as ProductColor[],
    // page: Number(searchParams?.page),
    // rate: Number(searchParams?.rate),
    // gte: searchParams?.price
    //   ? searchParams?.price === "$"
    //     ? 0
    //     : searchParams?.price === "$$"
    //       ? 10
    //       : 100
    //   : undefined,
    // lte: searchParams.price
    //   ? searchParams.price === "$"
    //     ? 10
    //     : searchParams.price === "$$"
    //       ? 100
    //       : 1000000
    //   : undefined,
  });

  return (
    <div className="mx-auto items-center p-4 xl:container">
      <div className="flex gap-5">
        {/* <div className="hidden flex-1 md:block">
          <Navigation />
        </div> */}
        <div className="flex-[5]">
          <ProductList products={products?.products} />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
