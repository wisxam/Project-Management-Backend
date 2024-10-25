/*
  Warnings:

  - You are about to drop the column `userId` on the `InvitationRequest` table. All the data in the column will be lost.
  - Added the required column `projectOwnerId` to the `InvitationRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userIdRequest` to the `InvitationRequest` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "InvitationRequest" DROP CONSTRAINT "InvitationRequest_userId_fkey";

-- AlterTable
ALTER TABLE "InvitationRequest" DROP COLUMN "userId",
ADD COLUMN     "projectOwnerId" INTEGER NOT NULL,
ADD COLUMN     "userIdRequest" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "InvitationRequest" ADD CONSTRAINT "InvitationRequest_userIdRequest_fkey" FOREIGN KEY ("userIdRequest") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
