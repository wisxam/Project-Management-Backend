import { Injectable } from '@nestjs/common';
import { GeneratedInviteCodeRepository } from 'src/infra/repositories/generatedcode.repository';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GeneratedInviteCodeService {
  constructor(
    private readonly generatedCodeRepository: GeneratedInviteCodeRepository,
  ) {}

  // async generateInviteCode(projectId: number) {
  //   const code = uuidv4();

  //   return this.generatedCodeRepository.generatedInviteCode(projectId, code);
  // }

  async validateInviteCode(code: string) {
    return this.generatedCodeRepository.validateInviteCode(code);
  }

  async deleteExpiredInviteCodes() {
    return this.generatedCodeRepository.deleteExpiredInviteCode();
  }
}
