import { Controller, Param, Body, Get, Put, UseGuards, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'
import { GetUser } from '../user/get-user.decorator'
import { User } from '../user/user.entity'
import { Profile } from './profile.entity'
import { ProfileService } from './profile.service'
import { UserRole } from '../user/user-role.enum'
import { UpdateProfileDTO } from './dto/update-profile.dto'
import { SocialDTO } from './dto/social.dto'
import { SocialEntity } from './social.entity'


@Controller('profile')
@UseGuards(AuthGuard())
export class ProfileController {
  constructor(
    private profileService: ProfileService
  ){}

  @Get('/')
  getProfile(@GetUser() user: User): Promise<Profile>{
    return this.profileService.getProfile(user)
  }

  @Get('/users')
  getUsersProfile(@GetUser() user: User): Promise<Profile[]>{
    return this.profileService.getUsersProfile(user)
  }

  @Get('/:id')
  getProfileById(@GetUser() user: User, @Param('id') id: string): Promise<Profile>{
    if(user.role !== UserRole.ADMIN){
      throw new UnauthorizedException()
    }
    return this.profileService.getProfileById(id)
  }

  @Put('/social')
  addSocial(@Body() dto: SocialDTO, @GetUser() user: User): Promise<SocialEntity>{
    return this.profileService.addSocialLinks(dto,user)
  }

  @Put('/')
  updateProfile(@Body() dto: UpdateProfileDTO, @GetUser() user: User): Promise<Profile>{
    return this.profileService.getUpdateProfile(dto,user)
  }

}
