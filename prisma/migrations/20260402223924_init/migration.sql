-- CreateTable
CREATE TABLE "FoodItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "barcode" TEXT,
    "baseServingSize" DOUBLE PRECISION,
    "baseCalories" DOUBLE PRECISION NOT NULL,
    "baseProtein" DOUBLE PRECISION NOT NULL,
    "baseFat" DOUBLE PRECISION NOT NULL,
    "baseCarbs" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "FoodItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoodLogEntry" (
    "id" TEXT NOT NULL,
    "dateLogged" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quantityConsumed" DOUBLE PRECISION NOT NULL,
    "manualCalories" DOUBLE PRECISION,
    "manualProtein" DOUBLE PRECISION,
    "manualFat" DOUBLE PRECISION,
    "manualCarbs" DOUBLE PRECISION,
    "foodItemId" TEXT NOT NULL,

    CONSTRAINT "FoodLogEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FoodItem_barcode_key" ON "FoodItem"("barcode");

-- AddForeignKey
ALTER TABLE "FoodLogEntry" ADD CONSTRAINT "FoodLogEntry_foodItemId_fkey" FOREIGN KEY ("foodItemId") REFERENCES "FoodItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
