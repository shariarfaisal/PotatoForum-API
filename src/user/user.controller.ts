import { Controller, Get, Param, Post, Body, Delete, ValidationPipe, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service'
import { User } from './user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { DeleteResult } from 'typeorm'
import { UpdateUserDto } from './dto/update-user.dto'
import { SigninDto } from './dto/signin.dto'
import { AuthGuard } from '@nestjs/passport'
import { GetUser } from './get-user.decorator'
import { Profile } from './profile.entity'
import { Post as PostEntity } from '../post/post.entity'
import { SocialDTO } from './dto/social.dto'
import { SocialEntity } from './social.entity'

@Controller('user')
export class UserController {
  constructor(private userService: UserService){}

  @Get('/')
  @UseGuards(AuthGuard())
  getUsers(@GetUser() user: User):Promise<User[] | Profile[]>{
    return this.userService.getUsers(user)
  }

  @Get('/profile')
  @UseGuards(AuthGuard())
  async getUserProfile(@GetUser() user: User):Promise<User>{
    return this.userService.getUserById(user.id)
  }


  @Put('/profile/social')
  addSocialLinks(@Body() dto: SocialDTO, @GetUser() user: User): Promise<SocialEntity>{
    return this.userService.addSocialLinks(dto,user)
  }

  @Get('/profile/posts')
  getPostsByProfile(@GetUser() user: User): Promise<PostEntity[]>{
    return this.userService.getPostsByUser(user.id)
  }

  @Get('/:userId')
  @UseGuards(AuthGuard())
  getUser(
    @GetUser() user: User,
    @Param('userId') userId: string
  ):Promise<User | Profile>{
    return this.userService.getUser(user,userId)
  }

  @Get('/:userId/posts')
  getPostsByUserId(
    @Param('userId') userId: string
  ): Promise<PostEntity[]>{
    return this.userService.getPostsByUser(userId)
  }



  // TODO: User isActive check ...
  // TODO: User banned ...
  // TODO: Email confirmation
  // TODO: User existence by username
  // TODO: Update password



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
