import Link from "next/link";
import React from "react";
import CartItems from "./_components/CartItems";

const CartPage = () => {
  return (
    <section className="">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mt-4 max-w-2xl md:mt-8">
          <div className="bg-white shadow">
            <div className="px-4 py-6 sm:px-8 sm:py-10">
              <div className="flow-root">
                <CartItems />
              </div>
              <div className="mt-6 text-center">
                <Link href="/checkout">
                  <button
                    type="button"
                    className="group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out hover:bg-gray-800 focus:shadow"
                  >
                    Proceed to Buy
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
