import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UpdateTaskStatus {
  @IsNotEmpty()
  @IsString()
  @Length(1, 256)
  status!: string;
}

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 256)
  title!: string;

  @IsOptional()
  @IsString()
  @Length(5, 122)
  description?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  priority?: string;

  @IsOptional()
  @IsString()
  @Length(3, 2000)
  tags?: string;

  @IsNotEmpty()
  @IsString()
  @IsDate()
  startDate!: Date;

  @IsNotEmpty()
  @IsString()
  @IsDate()
  dueDate!: Date;

  @IsNumber()
  points!: number;

  @IsNumber()
  projectId!: number;

  @IsNumber()
  authorUserId!: number;

  @IsNumber()
  assignedUserId!: number;
}
