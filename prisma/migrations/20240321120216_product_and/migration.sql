-- CreateEnum
CREATE TYPE "CollectionType" AS ENUM ('MEN', 'WOMEN', 'KIDS');

-- CreateEnum
CREATE TYPE "ProductSize" AS ENUM ('S', 'M', 'L', 'XL', 'XXL', 'XXXL');

-- CreateEnum
CREATE TYPE "ProductColor" AS ENUM ('BLACK', 'WHITE', 'GRAY', 'RED', 'ORANGE', 'YELLOW', 'GREEN', 'PINK', 'BLUE', 'PURPLE');

-- CreateTable
CREATE TABLE "collections" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "slug" TEXT NOT NULL,
    "types" "CollectionType"[],
    "parentId" TEXT,

    CONSTRAINT "collections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "colors" "ProductColor"[],
    "sizes" "ProductSize"[],
    "types" "CollectionType"[],
    "collectionId" TEXT NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_images" (
    "id" SERIAL NOT NULL,
    "imageURL" TEXT NOT NULL,
    "imageBlur" TEXT NOT NULL,
    "productId" TEXT,

    CONSTRAINT "product_images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "collections_slug_key" ON "collections"("slug");

-- AddForeignKey
ALTER TABLE "collections" ADD CONSTRAINT "collections_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "collections"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "collections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;
