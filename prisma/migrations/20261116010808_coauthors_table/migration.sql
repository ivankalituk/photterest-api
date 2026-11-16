-- CreateTable
CREATE TABLE "board_coauthors" (
    "id" UUID NOT NULL,
    "board_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "board_coauthors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "board_coauthors_user_id_idx" ON "board_coauthors"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "board_coauthors_board_id_user_id_key" ON "board_coauthors"("board_id", "user_id");

-- AddForeignKey
ALTER TABLE "board_coauthors" ADD CONSTRAINT "board_coauthors_board_id_fkey" FOREIGN KEY ("board_id") REFERENCES "boards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "board_coauthors" ADD CONSTRAINT "board_coauthors_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
