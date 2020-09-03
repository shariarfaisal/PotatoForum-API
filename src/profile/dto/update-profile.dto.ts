import { IsString, IsEmpty } from 'class-validator'

export class UpdateProfileDTO{
  @IsEmpty()
  @IsString()
  name: string;

  @IsString()
  work: string;

  @IsString()
  address: string;

  @IsString()
  imageUrl: string;
}
