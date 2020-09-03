import { Injectable, NotFoundException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { ProfileRepository } from './profile.repository'
import { User } from '../user/user.entity'
import { Profile } from './profile.entity'
import { UpdateProfileDTO } from './dto/update-profile.dto'
import { SocialDTO } from './dto/social.dto'
import { SocialEntity } from './social.entity'
import { UserRole } from '../user/user-role.enum'

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileRepository)
    private profileRepository: ProfileRepository
  ){}

  async getProfile(user: User): Promise<Profile>{
    const found = await this.profileRepository.findOne({ userId: user.id })
    if(!found){
      throw new NotFoundException()
    }
    return found
  }

  async getUsersProfile(user: User): Promise<Profile[]>{
    if(user.role !== UserRole.ADMIN ){
      throw new UnauthorizedException()
    }
    try{
      const items = await this.profileRepository.find()
      return items
    }catch(err){
      throw new InternalServerErrorException()
    }
  }

  async getProfileById(id: string): Promise<Profile>{
    const found = await this.profileRepository.findOne(id)
    if(!found){
      throw new NotFoundException()
    }
    return found
  }

  async addSocialLinks(dto: SocialDTO,user: User): Promise<SocialEntity>{
    const { facebook, twitter, linkedin, github, web } = dto
    const profile = await this.getProfile(user)


    const social = new SocialEntity()
    social.facebook = facebook
    social.twitter = twitter
    social.linkedin = linkedin
    social.github = github
    social.web = web

    profile.social = social

    try{
      await profile.save()
      return profile.social
    }catch(err){
      throw new InternalServerErrorException()
    }
  }

  getUpdateProfile(dto: UpdateProfileDTO, user: User): Promise<Profile>{
    return this.profileRepository.updateProfile(dto, user)
  }
}
