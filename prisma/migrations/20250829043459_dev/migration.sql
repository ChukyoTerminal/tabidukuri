/*
  Warnings:

  - The primary key for the `edge_comments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `edge_notes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `edges` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `node_comments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `node_notes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `nodes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `room_comments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `room_invitations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `room_members` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `room_notes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `rooms` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `transportation_hops` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "public"."edge_comments" DROP CONSTRAINT "edge_comments_author_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."edge_comments" DROP CONSTRAINT "edge_comments_edge_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."edge_notes" DROP CONSTRAINT "edge_notes_author_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."edge_notes" DROP CONSTRAINT "edge_notes_edge_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."edges" DROP CONSTRAINT "edges_from_node_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."edges" DROP CONSTRAINT "edges_to_node_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."edges" DROP CONSTRAINT "edges_transportation_hop_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."node_comments" DROP CONSTRAINT "node_comments_author_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."node_comments" DROP CONSTRAINT "node_comments_node_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."node_notes" DROP CONSTRAINT "node_notes_author_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."node_notes" DROP CONSTRAINT "node_notes_node_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."nodes" DROP CONSTRAINT "nodes_room_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."room_comments" DROP CONSTRAINT "room_comments_author_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."room_comments" DROP CONSTRAINT "room_comments_room_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."room_invitations" DROP CONSTRAINT "room_invitations_room_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."room_members" DROP CONSTRAINT "room_members_room_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."room_members" DROP CONSTRAINT "room_members_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."room_notes" DROP CONSTRAINT "room_notes_author_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."room_notes" DROP CONSTRAINT "room_notes_room_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."rooms" DROP CONSTRAINT "rooms_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."transportation_hops" DROP CONSTRAINT "transportation_hops_next_hop_id_fkey";

-- AlterTable
ALTER TABLE "public"."edge_comments" DROP CONSTRAINT "edge_comments_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "edge_id" SET DATA TYPE TEXT,
ALTER COLUMN "author_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "edge_comments_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."edge_notes" DROP CONSTRAINT "edge_notes_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "edge_id" SET DATA TYPE TEXT,
ALTER COLUMN "author_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "edge_notes_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."edges" DROP CONSTRAINT "edges_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "from_node_id" SET DATA TYPE TEXT,
ALTER COLUMN "to_node_id" SET DATA TYPE TEXT,
ALTER COLUMN "transportation_hop_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "edges_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."node_comments" DROP CONSTRAINT "node_comments_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "node_id" SET DATA TYPE TEXT,
ALTER COLUMN "author_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "node_comments_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."node_notes" DROP CONSTRAINT "node_notes_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "node_id" SET DATA TYPE TEXT,
ALTER COLUMN "author_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "node_notes_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."nodes" DROP CONSTRAINT "nodes_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "room_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "nodes_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."room_comments" DROP CONSTRAINT "room_comments_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "room_id" SET DATA TYPE TEXT,
ALTER COLUMN "author_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "room_comments_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."room_invitations" DROP CONSTRAINT "room_invitations_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "room_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "room_invitations_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."room_members" DROP CONSTRAINT "room_members_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ALTER COLUMN "room_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "room_members_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."room_notes" DROP CONSTRAINT "room_notes_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "room_id" SET DATA TYPE TEXT,
ALTER COLUMN "author_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "room_notes_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."rooms" DROP CONSTRAINT "rooms_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "owner_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "rooms_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."transportation_hops" DROP CONSTRAINT "transportation_hops_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "next_hop_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "transportation_hops_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."users" DROP CONSTRAINT "users_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "public"."rooms" ADD CONSTRAINT "rooms_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."room_members" ADD CONSTRAINT "room_members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."room_members" ADD CONSTRAINT "room_members_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "public"."rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."room_invitations" ADD CONSTRAINT "room_invitations_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "public"."rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."room_comments" ADD CONSTRAINT "room_comments_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "public"."rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."room_comments" ADD CONSTRAINT "room_comments_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."room_notes" ADD CONSTRAINT "room_notes_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "public"."rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."room_notes" ADD CONSTRAINT "room_notes_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."nodes" ADD CONSTRAINT "nodes_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "public"."rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."node_comments" ADD CONSTRAINT "node_comments_node_id_fkey" FOREIGN KEY ("node_id") REFERENCES "public"."nodes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."node_comments" ADD CONSTRAINT "node_comments_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."node_notes" ADD CONSTRAINT "node_notes_node_id_fkey" FOREIGN KEY ("node_id") REFERENCES "public"."nodes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."node_notes" ADD CONSTRAINT "node_notes_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."transportation_hops" ADD CONSTRAINT "transportation_hops_next_hop_id_fkey" FOREIGN KEY ("next_hop_id") REFERENCES "public"."transportation_hops"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."edges" ADD CONSTRAINT "edges_from_node_id_fkey" FOREIGN KEY ("from_node_id") REFERENCES "public"."nodes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."edges" ADD CONSTRAINT "edges_to_node_id_fkey" FOREIGN KEY ("to_node_id") REFERENCES "public"."nodes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."edges" ADD CONSTRAINT "edges_transportation_hop_id_fkey" FOREIGN KEY ("transportation_hop_id") REFERENCES "public"."transportation_hops"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."edge_comments" ADD CONSTRAINT "edge_comments_edge_id_fkey" FOREIGN KEY ("edge_id") REFERENCES "public"."edges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."edge_comments" ADD CONSTRAINT "edge_comments_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."edge_notes" ADD CONSTRAINT "edge_notes_edge_id_fkey" FOREIGN KEY ("edge_id") REFERENCES "public"."edges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."edge_notes" ADD CONSTRAINT "edge_notes_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
