import { IsDateString, IsMongoId, IsOptional, IsString} from 'class-validator';

export class orderQueryDto {
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsMongoId()
  tailorId?: string;

  @IsOptional()
  @IsString()
  status?: string;
}
