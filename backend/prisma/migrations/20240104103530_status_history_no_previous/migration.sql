-- DropForeignKey
ALTER TABLE "StatusHistory" DROP CONSTRAINT "StatusHistory_previousStatusId_fkey";

-- AlterTable
ALTER TABLE "StatusHistory" ALTER COLUMN "previousStatusId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "StatusHistory" ADD CONSTRAINT "StatusHistory_previousStatusId_fkey" FOREIGN KEY ("previousStatusId") REFERENCES "PlantStatus"("id") ON DELETE SET NULL ON UPDATE CASCADE;
