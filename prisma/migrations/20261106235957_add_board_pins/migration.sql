-- CreateTable
CREATE TABLE "board_pins" (
    "id" UUID NOT NULL,
    "pin_id" UUID NOT NULL,
    "board_id" UUID NOT NULL,

    CONSTRAINT "board_pins_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "board_pins_pin_id_board_id_key" ON "board_pins"("pin_id", "board_id");

-- AddForeignKey
ALTER TABLE "board_pins" ADD CONSTRAINT "board_pins_pin_id_fkey" FOREIGN KEY ("pin_id") REFERENCES "pins"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "board_pins" ADD CONSTRAINT "board_pins_board_id_fkey" FOREIGN KEY ("board_id") REFERENCES "boards"("id") ON DELETE CASCADE ON UPDATE CASCADE;
