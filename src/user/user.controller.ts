import { Controller, Get, Param, Post, Body, Delete, ValidationPipe, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service'
import { User } from './user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { DeleteResult } from 'typeorm'
import { UpdateUserDto } from './dto/update-user.dto'
import { SigninDto } from './dto/signin.dto'
import { AuthGuard } from '@nestjs/passport'
import { GetUser } from './get-user.decorator'


@Controller('user')
export class UserController {
  constructor(private userService: UserService){}

  @Get('/')
  @UseGuards(AuthGuard())
  getUsers():Promise<User[]>{
    return this.userService.getUsers()
  }

  @Get('/self')
  @UseGuards(AuthGuard())
  async getUserSelf(@GetUser() user: User):Promise<User>{
    return await User.findOne(user.id)
  }

  @Get('/:id')
  @UseGuards(AuthGuard())
  getUsersById(@Param('id') id: string):Promise<User>{
    return this.userService.getUsersById(id)
  }

  @Post('/signup')
  signupUser(@Body(ValidationPipe) data: CreateUserDto):Promise<User>{
    return this.userService.signupUser(data)
  }

  @Post('/signup/admin')
  signupUserAdmin(@Body(ValidationPipe) data: CreateUserDto):Promise<User>{
    return this.userService.signupUserAdmin(data,true)
  }

  @Post('/signin')
  signin(@Body(ValidationPipe) data: SigninDto):Promise<{ accessToken: string }>{
    return this.userService.signin(data)
  }

  @Delete('/')
  @UseGuards(AuthGuard())
  deleteUser(@GetUser() user: User): Promise<DeleteResult>{
    return this.userService.deleteUser(user.id)
  }

  @Put('/')
  updateUser(@Body() updateData: UpdateUserDto, @GetUser() user: User): Promise<User>{
    return this.userService.updateUser(user.id,updateData)
  }

}
