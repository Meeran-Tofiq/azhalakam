/*
  Warnings:

  - You are about to drop the column `paymentType` on the `Service` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "BillingType" AS ENUM ('PER_HOUR', 'TOTAL');

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "paymentType",
ADD COLUMN     "billingType" "BillingType";

-- DropEnum
DROP TYPE "PaymentType";
