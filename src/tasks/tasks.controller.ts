import { Controller, Get, Post, Body, Param, Query, Put, Delete, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service'
import { CreateTaskDTO } from './dto/create-task.dto'
import { GetTaskFilterDTO } from './dto/get-task-filter.dto'
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe'
import { Task } from './task.entity'


@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService){}

  // @Get()
  // getAllTasks(@Query(ValidationPipe) filterDTO: GetTaskFilterDTO): Task[] {
  //   if(Object.keys(filterDTO).length > 0){
  //     return  this.taskService.getTaskFilter(filterDTO)
  //   }else{
  //     return this.taskService.getAllTasks()
  //   }
  // }
  //
  @Get('/:id')
  async getTaskByID(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return await this.taskService.getTaskByID(id)
  }
  //
  // @Post()
  // @UsePipes(ValidationPipe)
  // createTask(@Body() body: CreateTaskDTO): Task{
  //   return this.taskService.createTask(body)
  // }
  //
  // @Put('/:id/status')
  // updateTaskStatus(@Param('id') id: String, @Body('status', TaskStatusValidationPipe) status: TaskStatus): Task{
  //   return this.taskService.updateTaskStatus(id,status)
  // }
  //
  // @Delete('/:id')
  // deleteTask(@Param('id') id: String): Task{
  //   return this.taskService.deleteTask(id)
  // }
}
