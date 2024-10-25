import { IsNotEmpty, IsString } from 'class-validator';

export class UserInfoDto {
  @IsNotEmpty()
  @IsString()
  userName!: string;

  @IsNotEmpty()
  @IsString()
  userEmail!: string;
}
