import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { CommentRepository } from './comment.repository'
import { User } from '../user/user.entity'
import { CommentDto } from './dto/comment.dto'
import { Comment } from './comment.entity'

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentRepository)
    private commentRepository: CommentRepository
  ){}

  async getCommentById(id): Promise<Comment>{
    const comment = await this.commentRepository.findOne(id)
    if(!comment){
      throw new NotFoundException()
    }
    return comment
  }

  createComment(postId: string, dto: CommentDto, user: User): Promise<Comment>{
    return this.commentRepository.createComment(postId, dto, user)
  }

  updateComment(commentId: string, dto: CommentDto, user: User): Promise<Comment>{
    return this.commentRepository.updateComment(commentId, dto, user)
  }

  async deleteComment(commentId: string, user: User): Promise<boolean>{
    const profile = await this.commentRepository.getProfileByUserId(user.id)
    const deletedComment = await this.commentRepository.delete({ id: commentId, profile: { id: profile.id }})
    if(deletedComment.affected === 0){
      throw new NotFoundException()
    }
    return true
  }
}
