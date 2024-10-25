import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class UsersProjectDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 256)
  username!: string;

  @IsNotEmpty()
  @IsString()
  email!: string;

  @IsNotEmpty()
  @IsNumber()
  userId!: number;
}
