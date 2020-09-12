import { Injectable, InternalServerErrorException, BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { PostRepository } from './post.repository'
import { User } from '../user/user.entity'
import { Post } from './post.entity'
import { Comment } from '../comment/comment.entity'
import { PostDto } from './dto/post.dto'
import { GetPostFilterDto } from './dto/get-post-filter.dto'
import { UserRole } from '../user/user-role.enum'

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostRepository)
    private postRepository: PostRepository
  ){}

  async getPosts(filterDto: GetPostFilterDto): Promise<Post[]>{
    const query = this.postRepository.createQueryBuilder('post')
    const { page, limit, search } = filterDto

    query.andWhere('post.published = :published',{ published: true})

    if(search){
      query.andWhere('post.title LIKE :search OR post.body LIKE :search',{ search })
    }

    if(page && Number(page)){
      query.offset(Number(limit) > 0 ? Number(limit) * Number(page) - Number(limit): Number(page) * 1 - 1)
    }

    if(limit && Number(limit) > 0){
      query.limit(Number(limit))
    }else{
      query.limit(10)
    }

    const posts = await query.getMany()
    return posts
  }

  async getPostById(id: string): Promise<Post>{
    const post = await this.postRepository.findOne(id)
    if(!post){
      throw new NotFoundException()
    }
    return post
  }

  async getPostsByProfileId(profileId: string): Promise<Post[]>{
    const posts = await this.postRepository.find({ profile: { id: profileId } })
    return posts
  }


  async getCommentsByPostId(postId: string): Promise<Comment[]>{
    const comments = await Comment.find({ post:{ id: postId } })
    return comments
  }


  async getCommentById(postId: string,commentId: string): Promise<Comment>{
    const comment = await Comment.findOne({ id: commentId, post:{ id: postId } })
    if(!comment){
      throw new NotFoundException()
    }
    return comment
  }

  createPost(dto: PostDto, user: User): Promise<Post>{
    return this.postRepository.createPost(dto,user)
  }

  updatePost(id: string, dto: PostDto, user: User): Promise<Post>{
    return this.postRepository.updatePost(id,dto,user)
  }


  async publishHandler(postId: string,dto:{ published: boolean },user: User): Promise<Post>{
    const { published } = dto
    if(typeof published !== 'boolean'){
      throw new BadRequestException("Published value must have to be true or false.")
    }

    const post = await this.postRepository.findOne(postId)
    if(!post){
      throw new NotFoundException()
    }

    if((post.profile.id !== user.profile.id) || (user.role !== UserRole.ADMIN)){
      throw new UnauthorizedException()
    }

    post.published = published
    await post.save()
    return post
  }


  deletePost(id: string, user: User):Promise<boolean>{
    return this.postRepository.deletePost(id,user)
  }
}
