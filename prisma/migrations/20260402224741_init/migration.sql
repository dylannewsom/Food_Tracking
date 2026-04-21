-- AlterTable
ALTER TABLE "FoodItem" ADD COLUMN     "baseCaffeine" DOUBLE PRECISION,
ADD COLUMN     "baseServingUnit" TEXT;

-- AlterTable
ALTER TABLE "FoodLogEntry" ADD COLUMN     "manualCaffeine" DOUBLE PRECISION,
ADD COLUMN     "manualServingSize" DOUBLE PRECISION,
ADD COLUMN     "manualServingUnit" TEXT;
