import { User } from './user.entity'
import { EntityRepository, Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { ConflictException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common'
import { SigninDto } from './dto/signin.dto'
import * as bcrypt from 'bcryptjs'
import { UserRole } from './user-role.enum'
import { Profile } from '../profile/profile.entity'

@EntityRepository(User)
export class UserRepository extends Repository<User>{

  async signupUser(createUserDto: CreateUserDto,admin?: boolean): Promise<User>{
    const { name, username, email, password } = createUserDto
    const user = new User()
    const profile = new Profile()
    const salt = await bcrypt.genSalt()

    user.username = username
    user.email = email
    user.isActive = true
    user.role = admin? UserRole.ADMIN : UserRole.AUTHOR
    user.banned = false
    user.password = await bcrypt.hash(password,salt)

    // TODO: Mail confirmation Token generate....

    profile.name = name
    profile.email = email
    profile.social = {
      facebook: '',
      twitter: '',
      linkedin: '',
      github: '',
      web: ''
    }

    try{
      await user.save()
      profile.user = user 
      await profile.save()
    }catch(err){
      if(err.code === '23505'){
        throw new ConflictException(err.detail)
      }else{
        throw new InternalServerErrorException()
      }
    }
    return user
  }

  async validateUserPassword(data: SigninDto):Promise<User>{
    const { username, password } = data
    const user = await this.findOne({ username })
    if(!user){
      throw new UnauthorizedException('Invalid cridentials!')
    }
    const hash = await bcrypt.compare(password,user.password)
    if(!hash){
      throw new UnauthorizedException('Invalid cridentials!')
    }

    return user
  }

}
