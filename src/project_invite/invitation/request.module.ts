import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/services/prisma.service';
import { InvitationRequestController } from './request.controller';
import { InvitationRequestRepository } from 'src/infra/repositories/inviteRequests.repository';
import { InvitationRequestService } from './request.service';

@Module({
  controllers: [InvitationRequestController],
  providers: [
    InvitationRequestRepository,
    PrismaService,
    InvitationRequestService,
  ],
  exports: [InvitationRequestService],
})
export class InvitesModule {}
