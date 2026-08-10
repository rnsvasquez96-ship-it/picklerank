-- AlterTable
ALTER TABLE "Tournament" ADD COLUMN     "championId" INTEGER;

-- AddForeignKey
ALTER TABLE "Tournament" ADD CONSTRAINT "Tournament_championId_fkey" FOREIGN KEY ("championId") REFERENCES "Player"("id") ON DELETE SET NULL ON UPDATE CASCADE;
