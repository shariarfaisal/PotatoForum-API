import { IsString, IsNotEmpty, IsArray} from 'class-validator'

export class PostDto{

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  body: string;

  @IsArray()
  tags: string[];
}
