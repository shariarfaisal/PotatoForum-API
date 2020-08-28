import { IsNotEmpty } from 'class-validator'
export class CreateTaskDTO {
  @IsNotEmpty()
  title: String;

  @IsNotEmpty()
  description: String;
}
