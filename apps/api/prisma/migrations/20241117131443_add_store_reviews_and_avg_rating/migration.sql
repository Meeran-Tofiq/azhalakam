-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "storeId" TEXT;

-- AlterTable
ALTER TABLE "Store" ADD COLUMN     "avgRating" DOUBLE PRECISION;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE SET NULL ON UPDATE CASCADE;
