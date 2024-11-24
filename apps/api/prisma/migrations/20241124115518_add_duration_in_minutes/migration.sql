/*
  Warnings:

  - Made the column `billingType` on table `Service` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "durationInMinutes" INTEGER,
ALTER COLUMN "billingType" SET NOT NULL,
ALTER COLUMN "billingType" SET DEFAULT 'TOTAL';
