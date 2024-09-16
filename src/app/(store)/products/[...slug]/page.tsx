import React from "react";
import { api } from "@/trpc/server";
import { type CollectionType } from "@prisma/client";
import ProductList from "../_components/ProductList";
import { redirect } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductPageProps {
  params: {
    slug: string[] | undefined;
  };
  searchParams: {
    page: string | undefined;
  };
}

const ProductPage: React.FC<ProductPageProps> = async ({
  params,
  searchParams,
}) => {
  const { slug } = params;

  const currentPage = searchParams?.page ? parseInt(searchParams.page, 10) : 1;

  if (isNaN(currentPage) || currentPage < 1) {
    return redirect(`/products?slug=${slug?.join("/") ?? ""}&page=1`);
  }

  const take = 8;

  const products = await api.product.list({
    take,
    types: slug?.[0]?.toUpperCase() as CollectionType,
    slug: slug?.[1],
    page: currentPage,
  });

  if (currentPage < 1 || currentPage > products.metadata.totalPages) {
    return redirect(`/products?slug=${slug?.join("/") ?? ""}&page=1`);
  }

  const renderPageNumbers = () => {
    const totalPages = products.metadata.totalPages;
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <a
          key={i}
          href={`?slug=${slug?.join("/") ?? ""}&page=${i}`}
          className={`mx-1 rounded px-3 py-1 ${currentPage === i ? "bg-black text-white" : "bg-gray-200"}`}
        >
          {i}
        </a>,
      );
    }
    return pages;
  };

  return (
    <div className="mx-auto items-center p-4 xl:container">
      <div className="flex gap-5">
        <div className="flex-[5]">
          <ProductList products={products?.products} />
          <div className="mt-4 flex items-center justify-center gap-2">
            <a
              className={`rounded bg-gray-200 px-2 py-1 ${currentPage === 1 ? "cursor-not-allowed opacity-50" : ""}`}
              href={`?slug=${slug?.join("/") ?? ""}&page=${currentPage - 1}`}
              aria-disabled={currentPage === 1}
            >
              <ChevronLeft />
            </a>

            <div className="flex">{renderPageNumbers()}</div>
            <a
              className={`rounded bg-gray-200 px-2 py-1 ${!products.metadata.hasNextPage ? "cursor-not-allowed opacity-50" : ""}`}
              href={`?slug=${slug?.join("/") ?? ""}&page=${currentPage + 1}`}
              aria-disabled={!products.metadata.hasNextPage}
            >
              <ChevronRight />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
