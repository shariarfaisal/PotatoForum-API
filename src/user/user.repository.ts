import { User } from './user.entity'
import { EntityRepository, Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { ConflictException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common'
import { SigninDto } from './dto/signin.dto'
import * as bcrypt from 'bcryptjs'


@EntityRepository(User)
export class UserRepository extends Repository<User>{

  async signupUser(createUserDto: CreateUserDto): Promise<User>{
    const { username, email, isActive, banned, password, role } = createUserDto
    const user = new User()
    const salt = await bcrypt.genSalt()

    user.username = username
    user.email = email
    user.isActive = isActive
    user.role = role
    user.banned = banned
    user.password = await bcrypt.hash(password,salt)

    try{
      await user.save()
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
