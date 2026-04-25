import { Type } from "class-transformer";
import { IsDate, IsEmail, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

class UserName {
  @IsNotEmpty()
  @IsString()
  firstName!: string;

  @IsNotEmpty()
  @IsString()
  lastName!: string;

  @IsOptional()
  @IsString()
  patronymic?: string;
}

class UserPassword {
  @IsNotEmpty()
  @IsString()
  hash!: string;

  @IsNotEmpty()
  @IsString()
  salt!: string;
}

export class CreateWorkerDto {
  @IsNotEmpty()
  @Type(() => UserName)
  name!: UserName;

  @IsOptional()
  @IsString()
  phone?: string;
  
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email!: string;

  @IsNotEmpty()
  @Type(() => UserPassword)
  password!: UserPassword;

  @IsNotEmpty()
  @IsEnum(['customer', 'tailor', 'manager'])
  role!: string;
  
  @IsDate()
  @IsNotEmpty()
  createdAt!: Date;

  @IsDate()
  @IsNotEmpty()
  updatedAt!: Date;
}
