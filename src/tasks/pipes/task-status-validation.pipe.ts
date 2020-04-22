import { PipeTransform, BadRequestException } from '@nestjs/common'
import { TaskStatus } from '../task.model'

export class TaskStatusValidationPipe implements PipeTransform{

  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ]

  transform(value: string){
    value = value.toUpperCase()
    if(!this.isStatusValid(value)){
      throw new BadRequestException
    }
    return value
  }

  private isStatusValid(status: any){
    const idx = this.allowedStatuses.indexOf(status)
    return idx !== -1
  }

}
