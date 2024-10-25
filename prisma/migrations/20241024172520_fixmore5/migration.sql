/*
  Warnings:

  - Added the required column `role` to the `ProjectUser` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProjectRole" AS ENUM ('admin', 'user');

-- AlterTable
ALTER TABLE "ProjectUser" ADD COLUMN     "role" TEXT NOT NULL;
