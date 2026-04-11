import { IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class SignUpDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  patronymic?: string;

  @IsOptional()
  @IsString()
  @IsPhoneNumber()
  phone?: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
