/*
  Warnings:

  - Made the column `productId` on table `product_images` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "product_images" DROP CONSTRAINT "product_images_productId_fkey";

-- AlterTable
ALTER TABLE "product_images" ALTER COLUMN "imageBlur" DROP NOT NULL,
ALTER COLUMN "productId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
