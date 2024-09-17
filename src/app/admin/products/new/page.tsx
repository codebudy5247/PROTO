import dynamic from "next/dynamic";
const AddProductForm = dynamic(
  () => import("../../_components/products/AddProductForm"),
  { ssr: false },
);

/**
 Prop 'id' did not match, is caused by the mismatch between the IDs generated during 
 server-side rendering (SSR) and client-side hydration. This is a common issue with libraries 
 like react-select in a Next.js environment, where the server and client can render different IDs.
 To resolve this, you can disable server-side rendering (SSR) for the component that uses react-
 select. This can be achieved by dynamically importing the component and turning off SSR using 
 next/dynamic.
 */
const AddProductPage = () => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-center text-lg font-semibold md:text-2xl">
          Add Product
        </h1>
      </div>
      <AddProductForm />
    </main>
  );
};

export default AddProductPage;
