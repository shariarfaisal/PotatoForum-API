import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto'
import { GetTaskFilterDTO } from './dto/get-task-filter.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { TaskRepository } from './task.repository'
import { Task } from './task.entity'

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ){}



  // getAllTasks(): Task[] {
  //   return this.tasks
  // }
  //
  // getTaskFilter(filterDTO: GetTaskFilterDTO): Task[]{
  //   let tasks = this.tasks
  //
  //   if(filterDTO.status){
  //     tasks = tasks.filter(task => task.status === filterDTO.status)
  //   }
  //
  //   if(filterDTO.search){
  //     tasks = tasks.filter(task => task.title.includes(filterDTO.search) || task.description.includes(filterDTO.search))
  //   }
  //
  //   return tasks
  // }
  //

  async getTaskByID(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);

    if(found){
      throw new NotFoundException(`Task id ${id} not found in the tasks!`)
    }

    return found
  }


  //
  // createTask(createTaskDTO: CreateTaskDTO): Task{
  //   const { title, description } = createTaskDTO
  //   const task: Task = {
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //     id: new Date().getTime().toString(),
  //   }
  //
  //   this.tasks.push(task)
  //   return task
  // }
  //
  // updateTaskStatus(id: String,status: TaskStatus): Task{
  //   const task = this.getTaskByID(id)
  //   task.status = status
  //   return task
  // }
  //
  // deleteTask(id: String): Task{
  //   const index = this.tasks.findIndex(i => i.id === id)
  //   if(index === -1){
  //     throw new NotFoundException(`Task ID ${id} not found!`)
  //   }
  //   const res = this.tasks[index]
  //   this.tasks.splice(index,1)
  //   return res
  // }
}
