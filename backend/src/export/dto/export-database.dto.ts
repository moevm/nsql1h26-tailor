import { IsOptional, IsString } from "class-validator";

export class ExportDatabaseDto {
  @IsOptional()
  @IsString()
  users?: string;

  @IsOptional()
  @IsString()
  orders?: string;

  @IsOptional()
  @IsString()
  format?: string;
}