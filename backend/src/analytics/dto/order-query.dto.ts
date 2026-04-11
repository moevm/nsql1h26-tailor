import { IsDateString, IsOptional, IsString, IsUUID } from 'class-validator';

export class orderQueryDto {
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsUUID()
  tailorId?: string;

  @IsOptional()
  @IsString()
  status?: string;
}
