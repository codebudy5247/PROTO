"use client";
import { useRouter, useSearchParams } from "next/navigation";

const rateOptions = ["4.5", "4", "3"];

const ProductRate = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedRate = searchParams.get("rate");

  const handleChange = (rate: string) => {
    const queryParams = new URLSearchParams(searchParams);
    queryParams.set("rate", rate);

    router.push(`?${queryParams.toString()}`);
  };
  return (
    <div className="rounded-lg bg-neutral-100">
      <div className="flex w-full items-center justify-between px-2.5 py-2.5 text-sm font-semibold text-neutral-600">
        PRODUCT RATE
      </div>
      <div>
        <ul className="flex flex-col gap-3 px-2.5 pb-2.5">
          {rateOptions.map((option) => (
            <li key={option} className="flex items-center gap-3">
              <input
                type="checkbox"
                id={String(option)}
                className="h-4 w-4 rounded border-gray-300 text-violet-700 focus:ring-violet-700"
                checked={option === selectedRate}
                onChange={() => handleChange(option)}
              />
              <label
                htmlFor={String(option)}
                className="flex items-center gap-3"
              >
                <span className="text-sm font-medium">{option}+</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductRate;