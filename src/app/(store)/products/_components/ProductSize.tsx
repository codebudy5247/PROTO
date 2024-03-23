import { useQuery } from "@/hooks/useQuery";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const sizeOptions = ["S", "M", "L", "XL", "XXL", "XXXL"];

const ProductSize = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { addQuery, removeQuery } = useQuery();

  const selectedSizes = searchParams.getAll("sizes");
  const handleChange = (option: string) => {
    const updatedSizes = selectedSizes.includes(option)
      ? selectedSizes.filter((size) => size !== option)
      : [...selectedSizes, option];

    const updatedQuery = addQuery("sizes", updatedSizes.join(","));
    if (updatedSizes.length === 0) removeQuery("sizes");
    else router.push(pathname + "?" + updatedQuery);
  };
  return (
    <div className="rounded-lg bg-neutral-100">
      <div className='className="flex text-neutral-600" w-full items-center justify-between px-2.5 py-2.5 text-sm font-semibold'>
        PRODUCT SIZE
      </div>
      <div>
        <ul className="flex flex-col gap-3 px-2.5 pb-2.5">
          {sizeOptions.map((option) => (
            <li key={option} className="flex items-center gap-3">
              <input
                type="checkbox"
                id={option}
                className="h-4 w-4 rounded border-gray-300 text-violet-700 focus:ring-violet-700"
                checked={selectedSizes.includes(option)}
                onChange={() => handleChange(option)}
              />
              <label htmlFor={option} className="flex items-center gap-1">
                <span className="text-sm font-medium">{option}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductSize;
