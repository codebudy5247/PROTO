/*
  Warnings:

  - The primary key for the `collections` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `collections` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `parentId` column on the `collections` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `collectionId` on the `products` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "collections" DROP CONSTRAINT "collections_parentId_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_collectionId_fkey";

-- AlterTable
ALTER TABLE "collections" DROP CONSTRAINT "collections_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "parentId",
ADD COLUMN     "parentId" INTEGER,
ADD CONSTRAINT "collections_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "products" DROP COLUMN "collectionId",
ADD COLUMN     "collectionId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "collections" ADD CONSTRAINT "collections_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "collections"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "collections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
