"use client";
import ProductSize from "./ProductSize";
import ProductColour from "./ProductColour";
import ProductPrice from "./ProductPrice";

export const Navigation = () => {
  return (
    <div className="flex flex-col gap-2 rounded-lg bg-white py-2">
      <ProductSize />
      <ProductPrice />
      <ProductColour />
    </div>
  );
};
