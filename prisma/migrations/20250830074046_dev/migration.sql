/*
  Warnings:

  - Added the required column `room_id` to the `edges` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."edges" ADD COLUMN     "room_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."edges" ADD CONSTRAINT "edges_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "public"."rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
