import { PipeTransform, BadRequestException } from '@nestjs/common'
import { TaskStatus } from '../task-status.enum'

export class TaskStatusValidationPipe implements PipeTransform{
  readonly allowedStatus = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ]

  transform(value: any): void{
    value = value.toUpperCase()
    const idx = this.allowedStatus.indexOf(value)
    if(idx === -1){
      throw new BadRequestException(`"${value}" is not valid status!`)
    }
    return value
  }


}
