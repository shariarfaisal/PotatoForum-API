import { Controller, Get, Post, Body, Param, Query, Put, Delete, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service'
import { CreateTaskDTO } from './dto/create-task.dto'
// import { GetTaskFilterDTO } from './dto/get-task-filter.dto'
// import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe'
import { Task } from './task.entity'
import { AuthGuard } from '@nestjs/passport'
import { GetUser } from '../user/get-user.decorator'
import { User } from '../user/user.entity'

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private taskService: TasksService){}


  @Get('/:id')
  getTaskByID(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.taskService.getTaskByID(id)
  }

  @Post('/')
  createTask(@Body(ValidationPipe) createTaskDTO: CreateTaskDTO, @GetUser() user: User): Promise<Task> {
    console.log(user)
    return this.taskService.createTask(createTaskDTO, user)
  }


}
