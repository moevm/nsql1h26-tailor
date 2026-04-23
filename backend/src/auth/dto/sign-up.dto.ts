import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsOptional()
  @IsString()
  patronymic?: string;

  @IsOptional()
  @IsString()
  @IsPhoneNumber('RU')
  phone?: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  // TODO: Добавить валидацию на сложность пароля
  @IsString()
  @IsNotEmpty()
  // @IsStrongPassword()
  password!: string;
}
