import { NotFoundException, UnauthorizedException, BadRequestException } from '@nestjs/common'
import { EntityRepository, Repository } from 'typeorm'
import { Comment } from './comment.entity'
import { User } from '../user/user.entity'
import { Post } from '../post/post.entity'
import { CommentDto } from './dto/comment.dto'

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment>{

  async getPostById(postId: string): Promise<Post>{
    const post = await Post.findOne(postId)
    if(!post){
      throw new NotFoundException()
    }
    return post
  }

  async createComment(postId: string,dto: CommentDto, user: User): Promise<Comment>{
    const { body } = dto
    if(!body){
      throw new BadRequestException({ errors:{ body: "Body required." }} )
    }else if(body.length > 1000){
      throw new BadRequestException({ errors:{ body: "1000 characters limited." }} )
    }

    const post = await this.getPostById(postId)
    const comment = new Comment()
    comment.body = body
    comment.post = post
    comment.profile = user.profile

    await comment.save()
    delete comment.post
    return comment
  }


  async updateComment(commentId: string, dto: CommentDto, user: User): Promise<Comment>{
    const comment = await this.findOne({ id: commentId, profile:{ id: user.profile.id } })
    if(!comment){
      throw new NotFoundException()
    }

    const { body } = dto
    if(!body){
      throw new BadRequestException({ errors:{ body: "Body required." }} )
    }else if(body.length > 1000){
      throw new BadRequestException({ errors:{ body: "1000 characters limited." }} )
    }

    await comment.save()
    return comment
  }
}
