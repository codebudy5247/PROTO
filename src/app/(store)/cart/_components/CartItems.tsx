"use client";
import { api } from "@/trpc/react";
import { X } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
const CartItems = () => {
  const { data: cartItems, refetch } = api.cart.list.useQuery();

  const totalPrice = cartItems?.cart?.reduce((prev, current) => {
    return prev + current.quantity * +current.Product.price;
  }, 0);

  const { mutate: changeQuantityFn } = api.cart.changeQuantity.useMutation({
    onSuccess: async () => {
      await refetch();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: deleteItemFn } = api.cart.deleteItem.useMutation({
    onSuccess: async () => {
      await refetch();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <>
      <ul className="-my-8">
        {cartItems?.cart.map((item) => (
          <div key={item.id}>
            <li className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
              <div className="shrink-0">
                <Image
                  height={50}
                  width={80}
                  className="max-w-full rounded-lg object-cover"
                  src={item?.Product?.images?.[0]?.imageURL ?? '/assets/product-1.jpg'}
                  alt=""
                />
              </div>

              <div className="relative flex flex-1 flex-col justify-between">
                <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                  <div className="pr-8 sm:pr-5">
                    <p className="text-base font-semibold text-gray-900">
                      {item.Product.name}
                    </p>
                    <div className="flex gap-2">
                    <p className="mx-0 mb-0 mt-1 text-sm text-gray-400">
                      Size:{item.size}
                    </p>
                    <p className="mx-0 mb-0 mt-1 text-sm text-gray-400">
                      Color:{item.color}
                    </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                    <p className="w-20 shrink-0 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
                      ₹{item.Product.price}
                    </p>

                    <div className="sm:order-1">
                      <div className="mx-auto flex h-8 items-stretch text-gray-600">
                        <button
                          disabled={item.quantity === 1}
                          onClick={() =>
                            changeQuantityFn({ quantity: item.quantity - 1, cartId: item.id })
                          }
                          className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                        >
                          -
                        </button>
                        <div className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">
                          {item.quantity}
                        </div>
                        <button
                          onClick={() =>
                            changeQuantityFn({ quantity: item.quantity + 1, cartId: item.id })
                          }
                          className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="right-0 top-0 flex justify-end sm:bottom-0 sm:top-auto">
                  <button
                    onClick={() => deleteItemFn({ cartId: item.id })}
                    type="button"
                    className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out hover:text-gray-900 focus:shadow"
                  >
                    <X />
                  </button>
                </div>
              </div>
            </li>
          </div>
        ))}
      </ul>
      <div className="mt-6 flex items-center justify-between border-t">
        <p className="text-sm font-medium text-gray-900">Total</p>
        <p className="text-2xl font-semibold text-gray-900">
          <span className="text-xs font-normal text-gray-400">RS</span>{" "}
          {totalPrice}
        </p>
      </div>
    </>
  );
};

export default CartItems;
