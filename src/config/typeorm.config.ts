import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { User } from '../user/user.entity'
import { Task } from '../tasks/task.entity'

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  database: 'potatoforum',
  password: 'postgres',
  entities: [ Task, User ],
  synchronize: true,
}