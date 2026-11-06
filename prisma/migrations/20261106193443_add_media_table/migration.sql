-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('IMAGE', 'VIDEO', 'MUSIC', 'DOCUMENT', 'OTHER');

-- CreateTable
CREATE TABLE "media" (
    "id" UUID NOT NULL,
    "filename" VARCHAR(255) NOT NULL,
    "original_name" VARCHAR(255),
    "mimeType" VARCHAR(150) NOT NULL,
    "type" "MediaType" NOT NULL,
    "size" INTEGER NOT NULL,
    "path" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "media_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "media_filename_key" ON "media"("filename");
