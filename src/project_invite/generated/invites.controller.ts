import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/services/prisma.service';

@Injectable()
export class GeneratedInviteCodeController {
  constructor(private prisma: PrismaService) {}

  //   TODO, make the post delete etc methods incase the code is lost or need new code etc etc
}
