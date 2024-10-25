/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `ProjectUser` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `ProjectUser` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `ProjectUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `ProjectUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProjectUser" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ProjectUser_username_key" ON "ProjectUser"("username");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectUser_email_key" ON "ProjectUser"("email");
