import { User } from './user.entity'
import { EntityRepository, Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'


@EntityRepository(User)
export class UserRepository extends Repository<User>{

  async signupUser(createUserDto: CreateUserDto): Promise<User>{
    const { username, email, isActive, banned, password, role } = createUserDto
    const user = new User()

    user.username = username
    user.email = email
    user.isActive = isActive
    user.role = role
    user.banned = banned
    user.password = password
    await user.save()

    return user
  }
  
}
