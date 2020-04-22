import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/Update-task.dto'
import { GetTaskFilterData } from './dto/get-task-filter.dto'

// ||

@Injectable()
export class TasksService {
  private tasks: Task[] = []

  getTasks(): Task[]{
    return this.tasks
  }

  getFilterData(filter: GetTaskFilterData): Task[]{
    let tasks = this.tasks
    if(filter.search){
      tasks = tasks.filter(i => (i.title.includes(filter.search)) || i.description.includes(filter.search))
    }

    if(filter.status){
      tasks = tasks.filter(i => i.status === filter.status)
    }

    return tasks
  }

  getTaskById(id: string): Task{
    const task =  this.tasks.find(task => task.id === id)
    if(!task){
      throw new NotFoundException()
    }
    return task
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto
    const task: Task = {
      id: 'kdfjadfkajdsfkjd',
      title,
      description,
      status: TaskStatus.OPEN
    }

    this.tasks.push(task)
    return task
  }

  updateTask(updateTaskDto: UpdateTaskDto, id: string ): Task{
    const { title, description, status } = updateTaskDto
    const task = this.getTaskById(id)
    task.title = title
    task.description = description
    task.status = status
    return task
  }

  updateTaskStatus({ id, status }: { id: string, status: TaskStatus }): Task {
    const task = this.getTaskById(id)
    task.status = status
    return task
  }

  deleteTask(id: string): string{
    this.getTaskById(id)
    this.tasks = this.tasks.filter(i => i.id === id)
    return "Task deleted!"
  }


}
