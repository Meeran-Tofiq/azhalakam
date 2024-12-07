-- DropForeignKey
ALTER TABLE "Vet" DROP CONSTRAINT "Vet_availabilityId_fkey";

-- AlterTable
ALTER TABLE "Vet" ALTER COLUMN "availabilityId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Vet" ADD CONSTRAINT "Vet_availabilityId_fkey" FOREIGN KEY ("availabilityId") REFERENCES "Availability"("id") ON DELETE SET NULL ON UPDATE CASCADE;
