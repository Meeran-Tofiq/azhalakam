/*
  Warnings:

  - You are about to drop the column `age` on the `Pet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "age",
ADD COLUMN     "dateOfBirth" TIMESTAMP(3);
