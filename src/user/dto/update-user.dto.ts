import { IsNotEmpty, IsString } from 'class-validator'

export class UpdateUserDto{
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsString()
  contact: string;

  @IsString()
  work: string;

  @IsString()
  address: string;

  @IsString()
  imageUrl: string;
}
