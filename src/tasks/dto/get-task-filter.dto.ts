import { TaskStatus } from '../task.model'
import { IsOptional, IsIn, IsNotEmpty } from 'class-validator'

export class GetTaskFilterData{
  @IsOptional()
  search: string

  @IsOptional()
  @IsIn([TaskStatus.OPEN,TaskStatus.DONE,TaskStatus.IN_PROGRESS])
  @IsNotEmpty()
  status: TaskStatus
}
