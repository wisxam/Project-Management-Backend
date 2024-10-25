-- AlterTable
ALTER TABLE "InvitationRequest" ADD COLUMN     "projectName" TEXT NOT NULL DEFAULT 'nice';

-- AlterTable
ALTER TABLE "InviteCode" ADD COLUMN     "projectName" TEXT NOT NULL DEFAULT 'nice';
