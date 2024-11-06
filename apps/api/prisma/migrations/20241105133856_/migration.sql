/*
  Warnings:

  - You are about to drop the column `petStoreId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Store` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_petStoreId_fkey";

-- DropForeignKey
ALTER TABLE "Store" DROP CONSTRAINT "Store_availabilityId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "petStoreId",
ADD COLUMN     "storeId" TEXT;

-- AlterTable
ALTER TABLE "Store" DROP COLUMN "location",
ADD COLUMN     "species" "Species"[],
ALTER COLUMN "availabilityId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_availabilityId_fkey" FOREIGN KEY ("availabilityId") REFERENCES "Availability"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE SET NULL ON UPDATE CASCADE;
