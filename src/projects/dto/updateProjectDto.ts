import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UpdateProjectDto {
  @IsOptional()
  @IsString()
  @Length(1, 256)
  name!: string;

  @IsOptional()
  @IsString()
  @Length(1, 4096)
  description?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsDate()
  startDate!: Date;

  @IsOptional()
  @IsNotEmpty()
  @IsDate()
  endDate!: Date;
}
