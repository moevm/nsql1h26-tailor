import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

class UserName {
  @IsNotEmpty()
  @IsString()
  firstName?: string;

  @IsNotEmpty()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  patronymic?: string;
}

export class UpdateUserDto {
  @IsNotEmpty()
  @Type(() => UserName)
  name?: UserName;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email?: string;
}
