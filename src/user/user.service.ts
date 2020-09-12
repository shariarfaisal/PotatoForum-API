import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException, UnauthorizedException, NotAcceptableException } from '@nestjs/common'
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
import { UpdatePasswordDto } from './dto/update-password.dto'
import * as bcrypt from 'bcryptjs'
import { GetUserFilterDto } from './dto/get-user-filter.dto'
import { GetPostFilterDto } from './dto/get-post-filter.dto'
import { updatePasswordValidator } from './validators/update-password.validator'
import { socialValidator } from './validators/social.validator'


@Injectable()
export class UserService{

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService
  ){}

  async getUsers(filterDto: GetUserFilterDto): Promise<User[]>{
    const { isActive, banned, limit, page } = filterDto
    const query = this.userRepository.createQueryBuilder('user')

    query.leftJoinAndSelect('user.profile','profile')

    if(isActive && (isActive === 'true' || isActive === 'false')){
      query.andWhere('user.isActive = :isActive',{ isActive: isActive === 'true'? true : false })
    }

    if(banned && (banned === 'true' || banned === 'false')){
      query.andWhere('user.banned = :banned',{ banned: banned === 'true'? true : false })
    }

    if(page && Number(page)){
      query.offset(Number(limit) > 0 ? Number(limit) * Number(page) - Number(limit): Number(page) * 1 - 1)
    }

    if(limit && Number(limit) > 0){
      query.limit(Number(limit))
    }else{
      query.limit(10)
    }

    const users = query.getMany()
    return users
  }

  async checkUsername(username: string): Promise<boolean>{
    const exists = await this.userRepository.findOne({ username })
    return exists ? true: false
  }

  async getUserById(userId: string): Promise<User>{
    const get = await this.userRepository.getUserById(userId)
    return get
  }


  async getPostsByUserId(user: User,filterDto: GetPostFilterDto): Promise<Post[]>{
    const query = Post.createQueryBuilder('post')
    const { page, limit, search, published } = filterDto
    query.andWhere('post.profile = :profile',{profile: user.profile.id })

    if(published && published === 'false'){
      query.andWhere('post.published = :published',{ published: false })
    }

    if(search){
      query.andWhere('post.title LIKE :search OR post.body LIKE :search',{ search })
    }

    if(page && Number(page)){
      query.offset(Number(limit) > 0 ? Number(limit) * Number(page) - Number(limit): Number(page) * 1 - 1)
    }

    if(limit && Number(limit) > 0){
      query.limit(Number(limit))
    }else{
      query.limit(10)
    }

    const posts = await query.getMany()
    return posts
  }

  async getPostsByAdminUserId(userId: string): Promise<Post[]>{
    const user = await this.getUserById(userId)
    if(user.role !== UserRole.ADMIN){
      throw new UnauthorizedException()
    }
    const posts = await Post.find({ profile: { id: user.profile.id } })
    return posts
  }

  signupUser(createUserDto: CreateUserDto): Promise<boolean>{
    return this.userRepository.signupUser(createUserDto)
  }

  signupUserAdmin(createUserDto: CreateUserDto,admin: boolean): Promise<boolean>{
    return this.userRepository.signupUser(createUserDto,admin)
  }

  async signin(data: SigninDto): Promise<{ accessToken: string }> {
    const user = await this.userRepository.validateUserPassword(data)

    const payloads: JwtPayload = { id: user.id, username: user.username, role: user.role }
    const accessToken = this.jwtService.sign(payloads)
    return { accessToken }
  }

  async deleteUser(user: User): Promise<string>{
    try{
      const deleteProfile = await Profile.delete(user.profile.id)
      if(deleteProfile.affected !== 0){
        const deleteUser = await this.userRepository.delete(user.id)
        if(deleteUser.affected !== 0){
          return "User deleted."
        }else{
          throw new NotFoundException("User not found.")
        }
      }else{
        throw new NotFoundException("Profile not found.")
      }
    }catch(err){
      throw new InternalServerErrorException()
    }
  }

  async updateUser(userId: string,dto: UpdateUserDto): Promise<User>{
    return this.userRepository.updateUser(userId,dto)
  }


  async addSocialLinks(dto: SocialDTO,userId: string): Promise<SocialEntity>{
    const { errors, isValid } = socialValidator(dto)
    if(!isValid){
      throw new BadRequestException({ errors })
    }
    
    const { facebook, twitter, linkedin, github, web } = dto
    const user = await this.getUserById(userId)
    const profile = await Profile.findOne(user.profile.id)

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

  async updatePassword(dto: UpdatePasswordDto ,userId: string): Promise<string>{
    const { errors, isValid } = updatePasswordValidator(dto)
    if(!isValid){
      throw new BadRequestException({ errors })
    }

    const user = await this.getUserById(userId)
    const { oldPassword, newPassword } = dto

    const salt = bcrypt.genSalt()
    const isPassValid = bcrypt.compare(oldPassword,user.password)
    if(!isPassValid){
      throw new BadRequestException("Invalid cridentials.")
    }

    user.password = await bcrypt.hash(newPassword,salt)

    try{
      await user.save()
      return "Password updated."
    }catch(err){
      throw new InternalServerErrorException()
    }
  }

  async bannedHandler(userId: string, banned: boolean): Promise<User>{
    if(typeof banned !== 'boolean'){
      throw new NotAcceptableException("Banned must have to be true or false")
    }
    const user = await this.userRepository.getUserById(userId)
    user.banned = banned
    await user.save()
    return user
  }

}
