/*
  Warnings:

  - You are about to drop the column `userId` on the `ServiceProvider` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Store` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[serviceProviderId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[storeId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "ServiceProvider" DROP CONSTRAINT "ServiceProvider_userId_fkey";

-- DropForeignKey
ALTER TABLE "Store" DROP CONSTRAINT "Store_userId_fkey";

-- DropIndex
DROP INDEX "ServiceProvider_userId_key";

-- DropIndex
DROP INDEX "Store_userId_key";

-- AlterTable
ALTER TABLE "ServiceProvider" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Store" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "serviceProviderId" TEXT,
ADD COLUMN     "storeId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_serviceProviderId_key" ON "User"("serviceProviderId");

-- CreateIndex
CREATE UNIQUE INDEX "User_storeId_key" ON "User"("storeId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_serviceProviderId_fkey" FOREIGN KEY ("serviceProviderId") REFERENCES "ServiceProvider"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE SET NULL ON UPDATE CASCADE;
