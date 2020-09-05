import { IsString, IsNotEmpty } from 'class-validator'
export class CommentDto{
  @IsNotEmpty()
  @IsString()
  body: string;
}
