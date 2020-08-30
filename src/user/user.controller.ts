import { Controller, Get, Param, Post, Body, Delete, ValidationPipe, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service'
import { User } from './user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { DeleteResult } from 'typeorm'
import { UpdateUserDto } from './dto/update-user.dto'
import { SigninDto } from './dto/signin.dto'
import { AuthGuard } from '@nestjs/passport'

@Controller('user')
export class UserController {
  constructor(private userService: UserService){}

  @Get('/')
  @UseGuards(AuthGuard())
  getUsers():Promise<User[]>{
    return this.userService.getUsers()
  }

  @Get('/:id')
  getUsersById(@Param('id') id: string):Promise<User>{
    return this.userService.getUsersById(id)
  }

  @Post('/signup')
  signupUser(@Body(ValidationPipe) data: CreateUserDto):Promise<User>{
    return this.userService.signupUser(data)
  }

  @Post('/signin')
  signin(@Body(ValidationPipe) data: SigninDto):Promise<{ accessToken: string }>{
    return this.userService.signin(data)
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
