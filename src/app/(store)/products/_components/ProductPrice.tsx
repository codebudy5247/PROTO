"use client";
import { useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";

const priceOptions = ["$", "$$", "$$$"];

const ProductPrice = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedPrice = searchParams.get("price");

  const handleChange = (price: string) => {
    const queryParams = new URLSearchParams(searchParams);
    queryParams.set("price", price);

    router.push(`?${queryParams.toString()}`);
  };

  return (
    <div className="rounded-lg bg-neutral-100">
      <div className='flex text-neutral-600" w-full items-center justify-between px-2.5 py-2.5 text-sm font-semibold'>
        PRODUCT PRICE
      </div>
      <div>
        <ul className="flex items-center justify-around gap-2 px-2.5 pb-2.5">
          {priceOptions.map((option) => (
            <li key={option} className="flex">
              <button
                className={clsx(
                  "w-16 cursor-pointer rounded-full border border-solid py-1 text-center text-sm  tracking-wider",
                  {
                    "border-neutral-500 font-medium text-neutral-500":
                      selectedPrice !== option,
                  },
                  {
                    "border-neutral-900 bg-neutral-900 font-normal text-white":
                      selectedPrice === option,
                  },
                )}
                onClick={() => handleChange(option)}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductPrice;
