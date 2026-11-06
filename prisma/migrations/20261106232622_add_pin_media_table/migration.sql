-- CreateTable
CREATE TABLE "pin_media" (
    "id" UUID NOT NULL,
    "pin_id" UUID NOT NULL,
    "media_id" UUID NOT NULL,

    CONSTRAINT "pin_media_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pin_media_pin_id_media_id_key" ON "pin_media"("pin_id", "media_id");

-- AddForeignKey
ALTER TABLE "pin_media" ADD CONSTRAINT "pin_media_pin_id_fkey" FOREIGN KEY ("pin_id") REFERENCES "pins"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pin_media" ADD CONSTRAINT "pin_media_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE;
