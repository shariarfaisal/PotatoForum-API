import { BadRequestException, NotFoundException } from '@nestjs/common'
import { EntityRepository, Repository } from 'typeorm'
import { Post } from './post.entity'
import { User } from '../user/user.entity'
import { Profile } from '../profile/profile.entity'
import { PostDto } from './dto/post.dto'

@EntityRepository(Post)
export class PostRepository extends Repository<Post>{

  async getProfile(id: string): Promise<Profile>{
    const profile = await Profile.findOne({ user: { id } })
    if(!profile){
      throw new BadRequestException()
    }
    return profile
  }

  async createPost(dto: PostDto, user: User): Promise<Post>{
    const profile = await this.getProfile(user.id)
    const { title, body, tags } = dto

    const post = new Post()
    post.title = title
    post.body = body
    post.tags = tags
    post.profile = profile
    await post.save()
    return post
  }


  async updatePost(id: string, dto: PostDto,user: User): Promise<Post>{
    const profile = await this.getProfile(user.id)
    const post = await this.findOne({ id, profile:{ id: profile.id } })
    if(!post){
      throw new NotFoundException()
    }

    const { title, body } = dto

    post.title = title
    post.body = body
    await post.save()
    return post
  }

  async deletePost(id: string, user: User): Promise<boolean>{
    const profile = await this.getProfile(user.id)
    const postDelete = await this.delete({ id, profile:{ id: profile.id } })
    if(postDelete.affected === 0){
      throw new NotFoundException()
    }
    return true
  }
}
