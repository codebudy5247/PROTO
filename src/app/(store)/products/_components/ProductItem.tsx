"use client";
import { Product } from "@/types";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { useState } from "react";


const ProductItem = ({
  id,
  name,
  price,
  rate,
  images,
  collection,
}: Product) => {
  const [currentImage, setCurrentImage] = useState(images[0]?.imageURL);
  const productLink = `/product/${id}`;

  return (
    <div className="group rounded-2xl bg-white p-2 shadow-sm">
      <div className="relative h-[400px] overflow-hidden rounded-2xl transition sm:h-[330px]">
        <Link href={productLink} className="relative block h-full w-full">
          {images.map(({ imageURL }) => (
            <Image
              key={imageURL}
              src={imageURL}
              alt={`${name} image`}
              className={clsx("absolute h-full w-full duration-700 ", {
                "opacity-100": currentImage === imageURL,
                "opacity-0": currentImage !== imageURL,
              })}
              width={350}
              height={350}
            />
          ))}
        </Link>
      </div>
      <div className="mb-1 mt-2 space-y-4 px-1">
        <div className="flex gap-2">
          {images.map(({ imageURL }, index) => (
            <button
              key={index}
              className="h-[40px] w-[40px] overflow-hidden rounded-full"
              onClick={() => setCurrentImage(imageURL)}
            >
              <Image
                src={imageURL}
                alt={`${name} image ${index + 1}`}
                className="object-cover"
                width={40}
                height={40}
                // placeholder="blur"
                // blurDataURL={imageBlur}
              />
            </button>
          ))}
        </div>
        <div>
          <h2 className="text-base font-medium">{name}</h2>
          <h3 className="text-xs font-normal capitalize text-neutral-400">
            {collection.name}
          </h3>
        </div>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-black">
            ₹{price.toFixed(2)}
          </h3>
          <div className="flex items-center justify-center text-xs font-medium text-neutral-500">
            <Star size={20} className="mr-1 text-yellow-400" />
            <h4>{rate} (69 Reviews)</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;

const shimmer = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/70 before:to-transparent`;

export const Skeleton = () => {
  return (
    <div className="rounded-2xl bg-white p-2">
      <div className={`h-[350px] rounded-2xl bg-neutral-200 ${shimmer}`} />
      <div className="my-3 space-y-3 px-1">
        <div className="flex gap-2">
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className={`h-[40px] w-[40px] rounded-full bg-neutral-200 ${shimmer}`}
              ></div>
            ))}
        </div>
        <div className={`h-4 w-full rounded-lg bg-neutral-200 ${shimmer}`} />
        <div className={`h-4 w-1/2 rounded-lg bg-neutral-200 ${shimmer}`} />
        <div className="flex justify-between">
          <div className={`h-4 w-1/3 rounded-lg bg-neutral-200 ${shimmer}`} />
          <div className={`h-4 w-1/3 rounded-lg bg-neutral-200 ${shimmer}`} />
        </div>
      </div>
    </div>
  );
};
