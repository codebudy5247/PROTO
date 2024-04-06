/*
  Warnings:

  - Added the required column `color` to the `cart_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `cart_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `color` to the `order_products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `order_products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cart_items" ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "size" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "order_products" ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "size" TEXT NOT NULL;
