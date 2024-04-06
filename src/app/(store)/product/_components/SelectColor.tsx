"use client";
import { ProductColor } from "@prisma/client";
import useCartStore from "@/hooks/useCart";

interface Props {
  colors: ProductColor[];
}

const colorOptions = [
  { label: "BLACK", value: "bg-black" },
  { label: "WHITE", value: "bg-white" },
  { label: "GRAY", value: "bg-neutral-600" },
  { label: "RED", value: "bg-red-700" },
  { label: "ORANGE", value: "bg-orange-600" },
  { label: "YELLOW", value: "bg-yellow-500" },
  { label: "GREEN", value: "bg-green-700" },
  { label: "PINK", value: "bg-pink-700" },
  { label: "BLUE", value: "bg-blue-600" },
  { label: "PURPLE", value: "bg-purple-700" },
];

const SelectColor = ({ colors }: Props) => {
  const { updateColor, color } = useCartStore((state) => state);
  return (
    <div className="mt-3 flex cursor-pointer select-none flex-wrap items-center gap-2">
      {colors.map((productColor, index) => {
        const matchingOption = colorOptions.find(
          (option) => option.label === productColor,
        );
        if (matchingOption) {
          return (
            <div
              key={index}
              className={`h-6 w-6 rounded-full ${matchingOption.value} ${matchingOption.label === color ? "border-2 border-black" : ""}`}
              title={matchingOption.label}
              onClick={() => updateColor(matchingOption.label)}
            />
          );
        }
        return null;
      })}
    </div>
  );
};

export default SelectColor;
