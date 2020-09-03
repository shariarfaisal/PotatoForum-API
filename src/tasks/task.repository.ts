import { Task } from './task.entity'
import { EntityRepository, Repository } from 'typeorm'
import { CreateTaskDTO } from './dto/create-task.dto'
import { TaskStatus } from './task-status.enum'
import { User } from '../user/user.entity'


@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

  async createTask(createTaskDTO: CreateTaskDTO,user: User): Promise<Task>{
    const { title, description } = createTaskDTO
    const task = new Task()
    task.title = title
    task.description = description
    task.status = TaskStatus.OPEN
    await task.save()
    return task
  }
}
