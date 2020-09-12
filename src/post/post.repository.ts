import { BadRequestException, NotFoundException } from '@nestjs/common'
import { EntityRepository, Repository } from 'typeorm'
import { Post } from './post.entity'
import { User } from '../user/user.entity'
import { Profile } from '../user/profile.entity'
import { PostDto } from './dto/post.dto'
import { postValidator } from './validators/post.validator'

@EntityRepository(Post)
export class PostRepository extends Repository<Post>{


  async createPost(dto: PostDto, user: User): Promise<Post>{
    const { errors, isValid } = postValidator(dto)
    if(!isValid){
      throw new BadRequestException({ errors })
    }

    const profile = await Profile.findOne(user.profile.id)
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
    const { errors, isValid } = postValidator(dto)
    if(!isValid){
      throw new BadRequestException({ errors })
    }

    
    const post = await this.findOne({ id, profile:{ id: user.profile.id } })
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
    const postDelete = await this.delete({ id, profile:{ id: user.profile.id } })
    if(postDelete.affected === 0){
      throw new NotFoundException()
    }
    return true
  }
}
