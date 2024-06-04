/*
  Warnings:

  - Added the required column `create_at` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_at` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `create_at` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_at` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "create_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "update_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "create_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "update_at" TIMESTAMP(3) NOT NULL;
