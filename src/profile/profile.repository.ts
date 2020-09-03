import { NotFoundException, InternalServerErrorException } from '@nestjs/common'
import { Repository, EntityRepository } from 'typeorm'
import { Profile } from './profile.entity'
import { User } from '../user/user.entity'
import { UpdateProfileDTO } from './dto/update-profile.dto'

@EntityRepository(Profile)
export class ProfileRepository extends Repository<Profile>{

  async updateProfile(dto: UpdateProfileDTO, user: User): Promise<Profile>{
    const profile = await this.findOne({ userId: user.id })
    if(!profile){
      throw new NotFoundException()
    }

    const { name, work, address, imageUrl } = dto
    profile.name = name
    profile.work = work
    profile.address = address
    profile.imageUrl = imageUrl

    try{
      await profile.save()
    }catch(err){
      throw new InternalServerErrorException()
    }

    return profile
  }
}
