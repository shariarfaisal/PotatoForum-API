import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { PassportModule } from '@nestjs/passport'
import { CommentRepository } from './comment.repository'
import { TypeOrmModule } from '@nestjs/typeorm'


@Module({
  imports:[
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([ CommentRepository ])
  ],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule {}
