import { IsNotEmpty, IsString, MinLength, MaxLength, Matches} from 'class-validator'

export class UpdatePasswordDto{
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(100)
  @Matches(/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})/,{ message: 'Password Too Week!'})
  newPassword: string;
}
