/*
  Warnings:

  - Made the column `inviteCodeId` on table `InvitationRequest` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "InvitationRequest" DROP CONSTRAINT "InvitationRequest_inviteCodeId_fkey";

-- AlterTable
ALTER TABLE "InvitationRequest" ALTER COLUMN "inviteCodeId" SET NOT NULL,
ALTER COLUMN "inviteCodeId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "InvitationRequest" ADD CONSTRAINT "InvitationRequest_inviteCodeId_fkey" FOREIGN KEY ("inviteCodeId") REFERENCES "InviteCode"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
