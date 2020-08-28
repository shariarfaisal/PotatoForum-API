import { TaskStatus } from '../task-status.enum'
import { IsOptional, IsIn, IsNotEmpty } from 'class-validator'


export class GetTaskFilterDTO{
  @IsOptional()
  @IsIn([TaskStatus.DONE,TaskStatus.IN_PROGRESS,TaskStatus.OPEN])
  status: TaskStatus

  @IsOptional()
  @IsNotEmpty()
  search: string
}
