/*
  Warnings:

  - A unique constraint covering the columns `[projectId]` on the table `InviteCode` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "InviteCode_projectId_key" ON "InviteCode"("projectId");
