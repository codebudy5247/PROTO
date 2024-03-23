import clsx from "clsx";
const priceOptions = ["$", "$$", "$$$"];

const ProductPrice = () => {
  const price = "";
  return (
    <div className="rounded-lg bg-neutral-100">
      <div className='className="flex text-neutral-600" w-full items-center justify-between px-2.5 py-2.5 text-sm font-semibold'>
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
                      price !== option,
                  },
                  {
                    "border-neutral-900 bg-neutral-900 font-normal text-white":
                      price === option,
                  },
                )}
                //   onClick={() => handleChange(option)}
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
