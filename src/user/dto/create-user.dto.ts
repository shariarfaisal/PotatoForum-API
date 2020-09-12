import { IsNotEmpty, IsOptional, IsString, IsEmail, MinLength, MaxLength, Matches } from 'class-validator'


export class CreateUserDto{

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(55)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(55)
  username: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @MaxLength(25)
  contact: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(100)
  @Matches(/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})/,{ message: 'Password Too Week!'})
  password: string;
}
