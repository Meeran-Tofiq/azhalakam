-- CreateEnum
CREATE TYPE "Species" AS ENUM ('Cat', 'Dog', 'Lizard', 'Snake', 'Fish', 'Hamster', 'Rabbit', 'Ferret', 'GuineaPig', 'Horse', 'Amphibian', 'Insect', 'Rodent', 'Bird');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female', 'NotSpecified');

-- CreateTable
CREATE TABLE "Pet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "species" "Species" NOT NULL,
    "age" INTEGER,
    "gender" "Gender",
    "weight" DOUBLE PRECISION,
    "lastVetVisit" TIMESTAMP(3),
    "notes" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
