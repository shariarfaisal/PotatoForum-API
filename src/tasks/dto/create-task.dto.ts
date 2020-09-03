import { IsNotEmpty } from 'class-validator'

export class CreateTaskDTO {
  @IsNotEmpty({message: 'Title must not be empty!'})
  title: string;

  @IsNotEmpty({message: 'Description must not be empty!'})
  description: string;
}
