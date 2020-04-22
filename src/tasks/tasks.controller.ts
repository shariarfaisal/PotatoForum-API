import { Controller, Get, Post, Put, Body, Param, Delete, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { TasksService } from './tasks.service'
import { Task, TaskStatus } from './task.model'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe'
import { GetTaskFilterData } from './dto/get-task-filter.dto'

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService){}

  @Get()
  getTasks(@Query(ValidationPipe) filterData: GetTaskFilterData): Task[] {
    if(Object.keys(filterData).length > 0){
      return this.tasksService.getFilterData(filterData)
    }
    return this.tasksService.getTasks()
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task{
    return this.tasksService.getTaskById(id)
  }


  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto){
    return this.tasksService.createTask(createTaskDto)
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): string{
    return this.tasksService.deleteTask(id)
  }

  @Put('/:id')
  updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Task{
    return this.tasksService.updateTask(updateTaskDto,id)
  }

  @Put('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status', TaskStatusValidationPipe ) status: TaskStatus
  ): Task{
    return this.tasksService.updateTaskStatus({ id, status })
  }

}
