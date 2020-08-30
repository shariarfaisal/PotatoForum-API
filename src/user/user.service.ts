import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult } from 'typeorm'
import { UserRepository } from './user.repository'
import { User } from './user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { SigninDto } from './dto/signin.dto'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from './jwt-payload.interface'


@Injectable()
export class UserService{

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService
  ){}

  async getUsers(): Promise<User[]>{
    const users = await this.userRepository.find()
    return users
  }

  async getUsersById(id: string): Promise<User>{
    const found = await this.userRepository.findOne(id)
    if(!found){
      throw new NotFoundException(`User with ID ${id} not found!`)
    }
    return found
  }

  signupUser(createUserDto: CreateUserDto): Promise<User>{
    return this.userRepository.signupUser(createUserDto)
  }

  async signin(data: SigninDto): Promise<{ accessToken: string }> {
    const user = await this.userRepository.validateUserPassword(data)

    const payloads: JwtPayload = { id: user.id, username: user.username, role: user.role }
    const accessToken = this.jwtService.sign(payloads)
    return { accessToken }
  }

  async deleteUser(id: string): Promise<DeleteResult>{
    const result = await this.userRepository.delete(id)
    if(result.affected === 0){
      throw new NotFoundException(`User with ID ${id} not found!`)
    }
    return result
  }

  async updateUser(id: string,updateData: UpdateUserDto): Promise<User>{
    const { username, email, isActive, banned, role } = updateData
    const user = await this.getUsersById(id)

    user.username = username
    user.email = email
    user.isActive = isActive
    user.banned = banned
    user.role = role
    await user.save()
    return user
  }

}
