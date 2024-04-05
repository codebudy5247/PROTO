"use client";

import { useState } from "react";

type image = {
  imageURL: string;
  imageBlur: string;
};
type Props = {
  images: image[];
};

const ProductImage = ({ images }: Props) => {
  const [currentImage, setCurrentImage] = useState(images[0]?.imageURL);
  
  return (
    <div className="lg:col-span-3 lg:row-end-1">
      <div className="lg:flex lg:items-start">
        <div className="lg:order-2 lg:ml-5">
          <div className="max-w-xl overflow-hidden rounded-lg">
            <img
              className="h-4/5 w-4/5 max-w-full object-cover"
              src={currentImage}
              alt=""
            />
          </div>
        </div>

        <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
          <div className="flex flex-row items-start lg:flex-col">
            {images.map(({ imageURL }, index) => (
              <button
                key={index}
                type="button"
                className="flex-0 mb-3 aspect-square h-20 overflow-hidden rounded-lg border-2 border-gray-900 text-center"
                onClick={() => setCurrentImage(imageURL)}
              >
                <img
                  className="h-full w-full object-cover"
                  src={imageURL}
                  alt={`image ${index + 1}`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductImage;
