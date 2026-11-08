/*
  Warnings:

  - You are about to drop the column `pins_updated_at` on the `boards` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "boards" DROP COLUMN "pins_updated_at",
ADD COLUMN     "inner_updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;
