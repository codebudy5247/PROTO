"use client";
import { Button } from "@/components/ui/button";
import { ProductSize } from "@prisma/client";
import useCartStore from "@/hooks/useCart";

interface Props {
  sizes: ProductSize[];
}

const SelectSize = ({ sizes }: Props) => {
  const { size, updateSize } = useCartStore((state) => state);

  return (
    <div className="mt-3 flex select-none flex-wrap items-center gap-1">
      {sizes.map((productSize, index) => (
        <Button
          key={index}
          variant="outline"
          className={`rounded-full hover:bg-black hover:text-white ${productSize === size ? "bg-black text-white" : ""}`}
          onClick={() => updateSize(productSize)}
        >
          {productSize}
        </Button>
      ))}
    </div>
  );
};

export default SelectSize;
