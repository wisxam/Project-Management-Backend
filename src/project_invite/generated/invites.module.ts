import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/services/prisma.service';
import { GeneratedInviteCodeRepository } from 'src/infra/repositories/generatedcode.repository';
import { GeneratedInviteCodeService } from './invites.service';
import { GeneratedInviteCodeController } from './invites.controller';

@Module({
  controllers: [GeneratedInviteCodeController],
  providers: [
    GeneratedInviteCodeRepository,
    PrismaService,
    GeneratedInviteCodeService,
  ],
  exports: [GeneratedInviteCodeService],
})
export class GeneratedInviteCode {}
