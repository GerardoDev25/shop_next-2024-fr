/*
  Warnings:

  - You are about to drop the column `constryId` on the `OrderAddress` table. All the data in the column will be lost.
  - Added the required column `countryId` to the `OrderAddress` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OrderAddress" DROP CONSTRAINT "OrderAddress_constryId_fkey";

-- AlterTable
ALTER TABLE "OrderAddress" DROP COLUMN "constryId",
ADD COLUMN     "countryId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "OrderAddress" ADD CONSTRAINT "OrderAddress_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
