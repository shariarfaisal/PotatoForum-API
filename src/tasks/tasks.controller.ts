import { Controller, Get, Post, Body, Param, Query, Put, Delete, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service'
// import { CreateTaskDTO } from './dto/create-task.dto'
// import { GetTaskFilterDTO } from './dto/get-task-filter.dto'
// import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe'
import { Task } from './task.entity'


@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService){}


  @Get('/:id')
  getTaskByID(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.taskService.getTaskByID(id)
  }


}
