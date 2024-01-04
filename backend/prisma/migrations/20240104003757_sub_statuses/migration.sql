/*
  Warnings:

  - You are about to drop the column `description` on the `PlantStatus` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[subStatus]` on the table `PlantStatus` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "PlantStatus" DROP COLUMN "description",
ADD COLUMN     "subStatus" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "PlantStatus_subStatus_key" ON "PlantStatus"("subStatus");
