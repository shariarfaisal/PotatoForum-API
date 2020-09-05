import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult } from 'typeorm'
import { UserRepository } from './user.repository'
import { User } from './user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { SigninDto } from './dto/signin.dto'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from './jwt-payload.interface'
import { Profile } from './profile.entity'
import { UserRole } from './user-role.enum'
import { Post } from '../post/post.entity'
import { SocialDTO } from './dto/social.dto'
import { SocialEntity } from './social.entity'

@Injectable()
export class UserService{

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService
  ){}

  async getUsers(user: User): Promise<User[] | Profile[]>{
    let users = []
    if(user.role === UserRole.ADMIN){
      users = await this.userRepository.find()
    }else{
      users = await Profile.find()
    }
    return users
  }

  async getUserById(userId: string): Promise<User>{
    return this.userRepository.getUserById(userId)
  }

  async getProfileByUserId(userId: string): Promise<Profile>{
    const found = await Profile.findOne({ user: { id: userId } })
    if(!found){
      throw new NotFoundException()
    }
    return found
  }

  async getUser(user: User, userId: string): Promise<User | Profile>{
    if(user.role === UserRole.ADMIN){
      return this.userRepository.getUserById(userId)
    }else{
      return this.getProfileByUserId(userId)
    }
  }

  async getPostsByUser(userId: string): Promise<Post[]>{
    const profile = await this.getProfileByUserId(userId)
    const posts = await Post.find({ profile: { id: profile.id }})
    return posts
  }

  signupUser(createUserDto: CreateUserDto): Promise<User>{
    return this.userRepository.signupUser(createUserDto)
  }

  signupUserAdmin(createUserDto: CreateUserDto,admin: boolean): Promise<User>{
    return this.userRepository.signupUser(createUserDto,admin)
  }

  async signin(data: SigninDto): Promise<{ accessToken: string }> {
    const user = await this.userRepository.validateUserPassword(data)

    const payloads: JwtPayload = { id: user.id, username: user.username, role: user.role }
    const accessToken = this.jwtService.sign(payloads)
    return { accessToken }
  }

  async deleteUser(id: string): Promise<DeleteResult>{
    // const profileDelete = await Profile.delete({ user: { id } })
    // if(profileDelete.affected === 0){
    //   throw new NotFoundException()
    // }

    // BUG: Delete User section can be break because of profile section dependency

    const result = await this.userRepository.delete(id)
    if(result.affected === 0){
      throw new NotFoundException(`User with ID ${id} not found!`)
    }
    return result
  }

  async updateUser(id: string,dto: UpdateUserDto): Promise<User>{
    return this.userRepository.updateUser(id,dto)
  }


  async addSocialLinks(dto: SocialDTO,user: User): Promise<SocialEntity>{
    const { facebook, twitter, linkedin, github, web } = dto
    const profile = await this.getProfileByUserId(user.id)

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


}
