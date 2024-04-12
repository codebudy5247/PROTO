"use client";
import React, { useState } from "react";
import Script from "next/script";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import toast from "react-hot-toast";

declare global {
  interface Window {
    Razorpay: any;
  }
}
interface RazorpayPaymentHandlerResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

const Payment = () => {
  const [submitting, setSubmitting] = useState(false);
  const { data: cartItems } = api.cart.list.useQuery();

  const totalPrice = cartItems?.cart?.reduce((prev, current) => {
    return prev + current.quantity * +current.Product.price;
  }, 0);

  const placeOrderHandler = async () => {
    try {
      setSubmitting(true);
      const createOrderResponse = await fetch(
        `http://localhost:3000/api/order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (createOrderResponse.ok) {
        const createOrderResponseData = await createOrderResponse.json();
        const generatePaymentResponse = await fetch(
          `http://localhost:3000/api/razorpay/generate`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              orderId: createOrderResponseData.id,
            }),
          },
        );
        if (generatePaymentResponse.ok) {
          const generatePaymentResponseData =
            await generatePaymentResponse.json();
          const options = {
            modal: {
              ondismiss: function () {
                setSubmitting(false);
              },
            },
            key: "rzp_test_NWmmolnPl4gb3H", // Razorpay key id
            name: "Aditya shekhar Pvt Ltd",
            currency: generatePaymentResponseData.currency,
            amount: generatePaymentResponseData.amount,
            order_id: generatePaymentResponseData.id,
            description: "Thankyou for your shopping",
            image: "https://example.com/your_logo",
            handler: async function (
              razorpayPaymentHandlerResponse: RazorpayPaymentHandlerResponse,
            ) {
              // Validate payment at server
              try {
                const verifyPaymentResponse = await fetch(
                  `http://localhost:3000/api/razorpay/verify`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      razorpay_order_id:
                        razorpayPaymentHandlerResponse.razorpay_order_id,
                      razorpay_payment_id:
                        razorpayPaymentHandlerResponse.razorpay_payment_id,
                      razorpay_signature:
                        razorpayPaymentHandlerResponse.razorpay_signature,
                    }),
                  },
                );
                if (verifyPaymentResponse.ok) {
                  // let verifyPaymentResponseData =
                  //   await verifyPaymentResponse.json();
                }
              } catch (error) {
                alert(error);
              }
            },
            prefill: {
              name: "Aditya shekhar",
              email: "aditya@gmail.com",
              contact: "9999999999",
            },
          };
          const paymentObject = new window.Razorpay(options);
          paymentObject.open();

          paymentObject.on("payment.failed", function () {
            toast.error(
              "Payment failed. Please try again. Contact support for help",
            );
          });
          setSubmitting(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8">
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <div className="mx-auto mt-4 max-w-2xl md:mt-8">
        <div className="bg-white shadow">
          <div className="px-4 py-2 sm:px-8 sm:py-5">
            <p className="text-xl font-medium">Payment Details</p>
            <div className="">
              {/* <div className="mt-6 border-t border-b py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Subtotal</p>
                  <p className="font-semibold text-gray-900">$399.00</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Shipping</p>
                  <p className="font-semibold text-gray-900">$8.00</p>
                </div>
              </div> */}
              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Total</p>
                <p className="text-2xl font-semibold text-gray-900">
                  ₹{totalPrice}
                </p>
              </div>
            </div>
            <Button onClick={placeOrderHandler} variant="default">
              {submitting ? "loading..." : "Place Order"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
