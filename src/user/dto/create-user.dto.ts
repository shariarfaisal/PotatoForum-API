import { IsNotEmpty, IsString, IsNumber, IsBoolean, IsEmail, MinLength, MaxLength, Matches } from 'class-validator'


export class CreateUserDto{
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(55)
  username: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;

  @IsNotEmpty()
  @IsBoolean()
  banned: boolean;

  @IsNotEmpty()
  @IsNumber()
  role: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(100)
  @Matches(/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})/,{ message: 'Password Too Week!'})
  password: string;
}
