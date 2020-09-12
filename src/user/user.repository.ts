import { User } from './user.entity'
import { EntityRepository, Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { ConflictException, InternalServerErrorException, NotFoundException, BadRequestException } from '@nestjs/common'
import { SigninDto } from './dto/signin.dto'
import * as bcrypt from 'bcryptjs'
import { UserRole } from './user-role.enum'
import { Profile } from './profile.entity'
import { UpdateUserDto } from './dto/update-user.dto'

@EntityRepository(User)
export class UserRepository extends Repository<User>{

  async getUserById(userId: string): Promise<User>{
    const found = await this.findOne(userId)
    if(!found){
      throw new NotFoundException()
    }
    return found
  }

  async signupUser(createUserDto: CreateUserDto,admin?: boolean): Promise<boolean>{
    const { name, username, email, password, contact } = createUserDto
    const user = new User()
    const profile = new Profile()
    const salt = await bcrypt.genSalt()

    const emailExists = await Profile.findOne({ email })
    if(emailExists){
      throw new ConflictException({ email: "Email already exists."})
    }

    const usernameExists = await User.findOne({ username })
    if(usernameExists){
      throw new ConflictException({ username: "Username taken."})
    }

    profile.name = name
    profile.email = email
    profile.social = {
      facebook: '',
      twitter: '',
      linkedin: '',
      github: '',
      web: ''
    }
    profile.address = ''
    profile.work = ''
    profile.imageUrl = 'img/default-profile.png'

    try{
      await profile.save()
    }catch(err){
      throw new InternalServerErrorException()
    }


    user.username = username
    user.email = email
    user.contact = contact
    user.isActive = true
    user.role = admin? UserRole.ADMIN : UserRole.AUTHOR
    user.banned = false
    user.password = await bcrypt.hash(password,salt)
    user.profile = profile
    // TODO: Mail confirmation Token generate....



    try{
      await user.save()
    }catch(err){
      throw new InternalServerErrorException()
    }
    return true
  }

  async updateUser(id: string,updateData: UpdateUserDto): Promise<User>{
    const { name, username, email, contact, work, address } = updateData
    const user = await this.getUserById(id)

    user.username = username
    user.email = email
    user.contact = contact

    user.profile.email = email
    user.profile.name = name
    user.profile.work = work
    user.profile.address = address


    try{
      await user.save()
      return user
    }catch(err){
      throw new InternalServerErrorException()
    }

  }

  async validateUserPassword(data: SigninDto):Promise<User>{
    const { username, password } = data
    const user = await this.findOne({ username })
    if(!user){
      throw new BadRequestException('Invalid cridentials!')
    }
    const hash = await bcrypt.compare(password,user.password)
    if(!hash){
      throw new BadRequestException('Invalid cridentials!')
    }

    return user
  }

}
