import { IsOptional, IsString } from 'class-validator';

export class CreateInvitationRequestDto {
  @IsOptional()
  @IsString()
  inviteCode!: string;
}
