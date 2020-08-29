import { IsNotEmpty } from 'class-validator'


export class CreateUserDto{
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  isActive: boolean;

  @IsNotEmpty()
  banned: boolean;

  @IsNotEmpty()
  role: number;

  @IsNotEmpty()
  password: string;
}
