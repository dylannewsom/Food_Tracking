/*
  Warnings:

  - Made the column `baseCaffeine` on table `FoodItem` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "FoodItem" ALTER COLUMN "baseCaffeine" SET NOT NULL;
