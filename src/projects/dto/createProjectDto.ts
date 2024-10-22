import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 256)
  name!: string;

  @IsOptional()
  @IsString()
  @Length(1, 4096)
  description?: string;

  @IsNotEmpty()
  @IsDate()
  startDate!: Date;

  @IsNotEmpty()
  @IsDate()
  endDate!: Date;
}
