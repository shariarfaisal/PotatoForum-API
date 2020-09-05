import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PassportModule } from '@nestjs/passport'
import { PostRepository } from './post.repository'
import { TypeOrmModule } from '@nestjs/typeorm'


@Module({
  imports:[
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([ PostRepository ])
  ],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
