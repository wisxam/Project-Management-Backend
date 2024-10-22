/*
  Warnings:

  - You are about to drop the column `assignedUserId` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `authorUserId` on the `Task` table. All the data in the column will be lost.
  - Made the column `startDate` on table `Task` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dueDate` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_assignedUserId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_authorUserId_fkey";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "assignedUserId",
DROP COLUMN "authorUserId",
ALTER COLUMN "startDate" SET NOT NULL,
ALTER COLUMN "dueDate" SET NOT NULL;
