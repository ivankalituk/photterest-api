/*
  Warnings:

  - You are about to drop the column `user_id` on the `boards` table. All the data in the column will be lost.
  - You are about to drop the column `mimeType` on the `media` table. All the data in the column will be lost.
  - Added the required column `creator_id` to the `boards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mime_type` to the `media` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "boards" DROP CONSTRAINT "boards_user_id_fkey";

-- AlterTable
ALTER TABLE "boards" DROP COLUMN "user_id",
ADD COLUMN     "creator_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "media" DROP COLUMN "mimeType",
ADD COLUMN     "mime_type" VARCHAR(150) NOT NULL;

-- CreateTable
CREATE TABLE "pins" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "link" VARCHAR(2048),
    "origin_board_id" UUID NOT NULL,
    "tags" VARCHAR(255)[],
    "ai_changed" BOOLEAN NOT NULL DEFAULT false,
    "ai_people_changed" BOOLEAN NOT NULL DEFAULT false,
    "allow_comments" BOOLEAN NOT NULL DEFAULT false,
    "creator_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "pins_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "boards" ADD CONSTRAINT "boards_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pins" ADD CONSTRAINT "pins_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pins" ADD CONSTRAINT "pins_origin_board_id_fkey" FOREIGN KEY ("origin_board_id") REFERENCES "boards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
