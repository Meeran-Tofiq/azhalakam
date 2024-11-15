-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_userId_fkey";

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
