import { NotFoundException, UnauthorizedException } from '@nestjs/common'
import { EntityRepository, Repository } from 'typeorm'
import { Comment } from './comment.entity'
import { User } from '../user/user.entity'
import { Post } from '../post/post.entity'
import { CommentDto } from './dto/comment.dto'
import { Profile } from '../profile/profile.entity'

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment>{

  async getPostById(postId: string): Promise<Post>{
    const post = await Post.findOne(postId)
    if(!post){
      throw new NotFoundException()
    }
    return post
  }

  async getProfileByUserId(userId: string): Promise<Profile>{
    const profile = await Profile.findOne({ user: { id: userId }})
    if(!profile){
      throw new UnauthorizedException()
    }
    return profile
  }

  async createComment(postId: string,dto: CommentDto, user: User): Promise<Comment>{
    const post = await this.getPostById(postId)
    const profile = await this.getProfileByUserId(user.id)
    const { body } = dto

    const comment = new Comment()
    comment.body = body
    comment.post = post
    comment.profile = profile

    await comment.save()
    return comment
  }


  async updateComment(commentId: string, dto: CommentDto, user: User): Promise<Comment>{
    const profile = await this.getProfileByUserId(user.id)
    const comment = await this.findOne({ id: commentId, profile:{ id: profile.id } })
    if(!comment){
      throw new NotFoundException()
    }

    const { body } = dto
    comment.body = body
    await comment.save()
    return comment
  }
}
