-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('PER_HOUR', 'TOTAL');

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "paymentType" "PaymentType";
