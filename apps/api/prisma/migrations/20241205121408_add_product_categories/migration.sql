-- CreateEnum
CREATE TYPE "ProductCategory" AS ENUM ('FOOD', 'TOY', 'MISCELLANEOUS');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "category" "ProductCategory" NOT NULL DEFAULT 'MISCELLANEOUS';
