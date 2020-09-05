import { IsString, IsNotEmpty } from 'class-validator'

export class UpdateProfileDTO{
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  work: string;

  @IsString()
  address: string;

  @IsString()
  imageUrl: string;
}
