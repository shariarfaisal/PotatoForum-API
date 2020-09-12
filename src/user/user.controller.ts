import { Controller, Query, Get, Param, Post, Body, Delete, ValidationPipe, Put, UseGuards, UnauthorizedException, ParseUUIDPipe } from '@nestjs/common';
import { UserService } from './user.service'
import { User } from './user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { SigninDto } from './dto/signin.dto'
import { AuthGuard } from '@nestjs/passport'
import { GetUser } from './get-user.decorator'
import { Post as PostEntity } from '../post/post.entity'
import { SocialDTO } from './dto/social.dto'
import { SocialEntity } from './social.entity'
import { UpdatePasswordDto } from './dto/update-password.dto'
import { UserRole } from './user-role.enum'
import { GetUserFilterDto } from './dto/get-user-filter.dto'
import { GetPostFilterDto } from './dto/get-post-filter.dto'

@Controller('user')
export class UserController {
  constructor(private userService: UserService){}

  @Get('/')
  @UseGuards(AuthGuard())
  getUsers(
    @Query() query: GetUserFilterDto,
    @GetUser() user: User
  ):Promise<User[]>{
    if(user.role !== UserRole.ADMIN){
      throw new UnauthorizedException()
    }
    return this.userService.getUsers(query)
  }

  @Get('/:username/check-username')
  async checkUserExistenceByUsername(@Param('username') username: string): Promise<boolean>{
    return this.userService.checkUsername(username)
  }


  @Get('/profile')
  @UseGuards(AuthGuard())
  async getUserProfile(@GetUser() user: User):Promise<User>{
    return this.userService.getUserById(user.id)
  }

  @Get('/profile/posts')
  @UseGuards(AuthGuard())
  getPostsByProfile(@Query() query: GetPostFilterDto,@GetUser() user: User): Promise<PostEntity[]>{
    return this.userService.getPostsByUserId(user,query)
  }


  @Put('/profile/social')
  updateSocialLinks(@Body() dto: SocialDTO, @GetUser() user: User): Promise<SocialEntity>{
    return this.userService.addSocialLinks(dto,user.id)
  }


  @Get('/:userId')
  @UseGuards(AuthGuard())
  getUserById(
    @GetUser() user: User,
    @Param('userId',ParseUUIDPipe) userId: string
  ):Promise<User>{
    if(user.role !== UserRole.ADMIN){
      throw new UnauthorizedException()
    }
    return this.userService.getUserById(userId)
  }


  @Get('/:userId/posts')
  getPostsByProfileId(
    @Param('userId',ParseUUIDPipe) userId: string
  ): Promise<PostEntity[]>{
    return this.userService.getPostsByAdminUserId(userId)
  }



  // TODO: User isActive check ...
  // TODO: User banned ...
  // TODO: Email confirmation
  // TODO: User existence by username



  @Post('/signup')
  signupUser(@Body(ValidationPipe) data: CreateUserDto):Promise<boolean>{
    return this.userService.signupUser(data)
  }

  @Post('/signup/admin')
  signupUserAdmin(@Body(ValidationPipe) data: CreateUserDto):Promise<boolean>{
    return this.userService.signupUserAdmin(data,true)
  }

  @Post('/signin')
  signin(@Body(ValidationPipe) data: SigninDto):Promise<{ accessToken: string }>{
    return this.userService.signin(data)
  }

  @Delete('/')
  @UseGuards(AuthGuard())
  deleteUser(@GetUser() user: User): Promise<string>{
    return this.userService.deleteUser(user)
  }

  @Put('/profile')
  @UseGuards(AuthGuard())
  updateUser(@Body() updateData: UpdateUserDto, @GetUser() user: User): Promise<User>{
    return this.userService.updateUser(user.id,updateData)
  }

  @Put('/password')
  updatePassword(@Body() dto: UpdatePasswordDto, @GetUser() user: User): Promise<string>{
    return this.userService.updatePassword(dto, user.id)
  }

  @Put('/:userId/banned')
  @UseGuards(AuthGuard())
  bannedHandler(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() body: { banned: boolean },
    @GetUser() user: User
  ): Promise<User>{
    if(user.role !== UserRole.ADMIN){
      throw new UnauthorizedException()
    }
    return this.userService.bannedHandler(userId,body.banned)
  }

}
