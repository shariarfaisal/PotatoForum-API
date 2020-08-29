import { IsNotEmpty } from 'class-validator'

export class UpdateUserDto{
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

}
