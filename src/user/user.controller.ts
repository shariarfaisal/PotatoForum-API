import { Controller, Get, Param, Post, Body, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service'
import { User } from './user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { DeleteResult } from 'typeorm'
import { UpdateUserDto } from './dto/update-user.dto'


@Controller('user')
export class UserController {
  constructor(private userService: UserService){}

  @Get('/')
  getUsers():Promise<User[]>{
    return this.userService.getUsers()
  }

  @Get('/:id')
  getUsersById(@Param('id') id: string):Promise<User>{
    return this.userService.getUsersById(id)
  }

  @Post('/signup')
  signupUser(@Body() data: CreateUserDto):Promise<User>{
    return this.userService.signupUser(data)
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string): Promise<DeleteResult>{
    return this.userService.deleteUser(id)
  }

  @Put('/:id')
  updateUser(@Param('id') id: string, @Body() updateData: UpdateUserDto): Promise<User>{
    return this.userService.updateUser(id,updateData)
  }
}
