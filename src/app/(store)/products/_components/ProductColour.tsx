"use client";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";

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

const ProductColour = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedColors = searchParams.getAll("colors");

  const handleColorChange = (color: string) => {
    const newColors = selectedColors.includes(color)
      ? selectedColors.filter((c) => c !== color)
      : [...selectedColors, color];

    const queryParams = new URLSearchParams(searchParams);
    queryParams.delete("colors");
    newColors.forEach((c) => queryParams.append("colors", c));
    router.push(`?${queryParams.toString()}`);
  };

  return (
    <div className="rounded-lg bg-neutral-100">
      <div className='className="flex text-neutral-600" w-full items-center justify-between px-2.5 py-2.5 text-sm font-semibold'>
        PRODUCT COLOR
      </div>
      <div>
        <ul className="flex flex-wrap gap-2 px-2.5 pb-2.5">
          {colorOptions.map(({ label, value }) => (
            <li key={label} className="flex items-center gap-3">
              <input
                type="checkbox"
                id={label}
                className="hidden"
                checked={selectedColors.includes(label)}
                onChange={() => handleColorChange(label)}
              />
              <label htmlFor={label} className="flex items-center gap-1">
                <span
                  className={clsx(
                    `h-6 w-6 cursor-pointer overflow-hidden rounded-full p-[2px]`,
                    {
                      "bg-violet-700": selectedColors.includes(label),
                      [value]: !selectedColors.includes(label),
                    },
                  )}
                >
                  {selectedColors.includes(label) && (
                    <div className="h-full w-full rounded-full bg-white p-[2px]">
                      <div className={`${value} h-full w-full rounded-full`} />
                    </div>
                  )}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductColour;
