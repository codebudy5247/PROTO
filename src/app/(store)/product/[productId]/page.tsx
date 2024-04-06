import { api } from "@/trpc/server";
import Container from "@/components/Container";
import ProductImage from "../_components/ProductImage";
import SelectSize from "../_components/SelectSize";
import SelectColor from "../_components/SelectColor";
import AddToBag from "../_components/AddToBag";

interface Props {
  params: {
    productId: string;
  };
}

const ProductDetail = async ({ params }: Props) => {
  const product = await api.product.id(params.productId);

  return (
    <>
      <Container>
        <div className="container mx-auto px-4">
          <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
            <ProductImage images={product.images} />

            <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
              <h1 className="sm: text-2xl font-bold text-gray-900 sm:text-3xl">
                {product?.name}
              </h1>

              <div className="mt-5 flex items-center">
                <p className="text-md font-medium text-gray-500">
                  {product?.description}
                </p>
              </div>

              <h2 className="mt-8 text-base text-gray-900">Sizes</h2>
              <SelectSize sizes={product.sizes} />
              <h2 className="mt-8 text-base text-gray-900">Colors</h2>
              <SelectColor colors={product.colors} />

              <div className="mt-10 flex flex-col items-center justify-between space-y-4 border-b border-t py-4 sm:flex-row sm:space-y-0">
                <div className="flex items-end">
                  <h1 className="text-3xl font-bold">
                    ₹{product.price.toFixed(2)}
                  </h1>
                </div>
                <AddToBag id={product.id} />
              </div>

              <ul className="mt-8 space-y-2">
                <li className="flex items-center text-left text-sm font-medium text-gray-600">
                  <svg
                    className="mr-2 block h-5 w-5 align-middle text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      className=""
                    ></path>
                  </svg>
                  Free shipping worldwide
                </li>

                <li className="flex items-center text-left text-sm font-medium text-gray-600">
                  <svg
                    className="mr-2 block h-5 w-5 align-middle text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      className=""
                    ></path>
                  </svg>
                  Cancel Anytime
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ProductDetail;
