import Link from "next/link";
import React from "react";
import CartItems from "./_components/CartItems";
import { Button } from "@/components/ui/button";

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
                  <Button type="button" variant="default" className="w-full">
                    Proceed to Buy
                  </Button>
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
