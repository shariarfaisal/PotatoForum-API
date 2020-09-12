import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { User } from '../user/user.entity'
import { Post } from '../post/post.entity'
import { Profile } from '../user/profile.entity'
import { Comment } from '../comment/comment.entity'
import * as config from 'config'

const dbConfig = config.get('db')

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: process.env.PG_HOSTNAME || dbConfig.host,
  port: 5432,
  username:  process.env.PG_USERNAME ||  dbConfig.username,
  database: process.env.PG_DATABASE ||  dbConfig.database,
  password: process.env.PASSWORD ||  dbConfig.password,
  entities: [ User, Profile, Post, Comment ],
  synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize,
}
