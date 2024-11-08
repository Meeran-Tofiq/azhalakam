/*
  Warnings:

  - The values [Male,Female,NotSpecified] on the enum `Gender` will be removed. If these variants are still used in the database, this will fail.
  - The values [Cat,Dog,Lizard,Snake,Fish,Hamster,Rabbit,Ferret,GuineaPig,Horse,Amphibian,Insect,Rodent,Bird] on the enum `Species` will be removed. If these variants are still used in the database, this will fail.
  - The values [PetStore,VetStore] on the enum `StoreType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Gender_new" AS ENUM ('MALE', 'FEMALE', 'NOT_SPECIFIED');
ALTER TABLE "Pet" ALTER COLUMN "gender" TYPE "Gender_new" USING ("gender"::text::"Gender_new");
ALTER TYPE "Gender" RENAME TO "Gender_old";
ALTER TYPE "Gender_new" RENAME TO "Gender";
DROP TYPE "Gender_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Species_new" AS ENUM ('CAT', 'DOG', 'LIZARD', 'SNAKE', 'FISH', 'HAMSTER', 'RABBIT', 'FERRET', 'GUINEAPIG', 'HORSE', 'AMPHIBIAN', 'INSECT', 'RODENT', 'BIRD');
ALTER TABLE "Pet" ALTER COLUMN "species" TYPE "Species_new" USING ("species"::text::"Species_new");
ALTER TABLE "Store" ALTER COLUMN "species" TYPE "Species_new"[] USING ("species"::text::"Species_new"[]);
ALTER TYPE "Species" RENAME TO "Species_old";
ALTER TYPE "Species_new" RENAME TO "Species";
DROP TYPE "Species_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "StoreType_new" AS ENUM ('PET_STORE', 'VET_STORE');
ALTER TABLE "Store" ALTER COLUMN "type" TYPE "StoreType_new" USING ("type"::text::"StoreType_new");
ALTER TYPE "StoreType" RENAME TO "StoreType_old";
ALTER TYPE "StoreType_new" RENAME TO "StoreType";
DROP TYPE "StoreType_old";
COMMIT;
