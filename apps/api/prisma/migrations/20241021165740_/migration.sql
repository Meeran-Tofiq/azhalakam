/*
  Warnings:

  - You are about to drop the column `userId` on the `Location` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[locationId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_userId_fkey";

-- DropIndex
DROP INDEX "Location_userId_key";

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "locationId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_locationId_key" ON "User"("locationId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;
