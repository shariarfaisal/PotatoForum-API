import { IsString } from 'class-validator'

export class SocialDTO{
  @IsString()
  facebook: string;

  @IsString()
  twitter: string;

  @IsString()
  linkedin: string;

  @IsString()
  github: string;

  @IsString()
  web: string;
}
