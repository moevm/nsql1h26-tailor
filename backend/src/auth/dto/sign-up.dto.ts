import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  firstName!: string;

  @IsNotEmpty()
  @IsString()
  lastName!: string;

  @IsOptional()
  @IsString()
  patronymic?: string;

  @IsOptional()
  @IsPhoneNumber()
  @IsString()
  phone?: string;

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email!: string;

  // TODO: Добавить валидацию на сложность пароля
  @IsNotEmpty()
  @IsString()
  // @IsStrongPassword()
  password!: string;
}
