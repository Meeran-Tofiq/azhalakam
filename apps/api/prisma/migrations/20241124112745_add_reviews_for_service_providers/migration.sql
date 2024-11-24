/*
  Warnings:

  - You are about to drop the column `rating` on the `ServiceProvider` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "serviceProviderId" TEXT;

-- AlterTable
ALTER TABLE "ServiceProvider" DROP COLUMN "rating";

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_serviceProviderId_fkey" FOREIGN KEY ("serviceProviderId") REFERENCES "ServiceProvider"("id") ON DELETE SET NULL ON UPDATE CASCADE;
