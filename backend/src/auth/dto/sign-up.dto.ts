import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
} from 'class-validator';

function normalizePhoneNumber(value: unknown): string | undefined {
  if (typeof value !== 'string') {
    return undefined;
  }

  const digits = value.replace(/\D/g, '');

  if (!digits) {
    return undefined;
  }

  if (
    digits.length === 11 &&
    (digits.startsWith('7') || digits.startsWith('8'))
  ) {
    return `+7${digits.slice(1)}`;
  }

  if (digits.length === 10) {
    return `+7${digits}`;
  }

  return value.trim();
}

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
  @Transform(({ value }) => normalizePhoneNumber(value))
  @Matches(/^\+7\d{10}$/)
  @IsPhoneNumber('RU')
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
