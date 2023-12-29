-- CreateTable
CREATE TABLE "Plant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "species" TEXT NOT NULL,
    "currentStatusId" INTEGER NOT NULL,

    CONSTRAINT "Plant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlantStatus" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "PlantStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StatusHistory" (
    "id" SERIAL NOT NULL,
    "plantId" INTEGER NOT NULL,
    "previousStatusId" INTEGER NOT NULL,
    "newStatusId" INTEGER NOT NULL,
    "changedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StatusHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PlantStatus_status_key" ON "PlantStatus"("status");

-- AddForeignKey
ALTER TABLE "Plant" ADD CONSTRAINT "Plant_currentStatusId_fkey" FOREIGN KEY ("currentStatusId") REFERENCES "PlantStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StatusHistory" ADD CONSTRAINT "StatusHistory_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StatusHistory" ADD CONSTRAINT "StatusHistory_previousStatusId_fkey" FOREIGN KEY ("previousStatusId") REFERENCES "PlantStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StatusHistory" ADD CONSTRAINT "StatusHistory_newStatusId_fkey" FOREIGN KEY ("newStatusId") REFERENCES "PlantStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
