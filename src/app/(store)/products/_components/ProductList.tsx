"use client";
import ProductItem from "./ProductItem";
import { Skeleton } from "./ProductItem";
import { Product } from "@/types";

interface Props {
  products: Product[] | undefined;
}

const ProductList = ({ products }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4">
      {/* {products === undefined &&
        Array(12)
          .fill("")
          .map((_, index) => <Skeleton key={index} />)} */}
      {products?.map((product) => (
        <div key={product.id}>
          <ProductItem {...product} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
