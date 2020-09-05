import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { PostRepository } from './post.repository'
import { User } from '../user/user.entity'
import { Post } from './post.entity'
import { Comment } from '../comment/comment.entity'
import { PostDto } from './dto/post.dto'


@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostRepository)
    private postRepository: PostRepository
  ){}

  async getPosts(): Promise<Post[]>{
    try{
      const posts = await this.postRepository.find()
      return posts
    }catch(err){
      throw new InternalServerErrorException()
    }
  }

  async getPostById(id: string): Promise<Post>{
    const post = await this.postRepository.findOne(id)
    if(!post){
      throw new NotFoundException()
    }
    return post
  }

  async getPostsByUser(id: string): Promise<Post[]>{
    const profile = await this.postRepository.getProfile(id)
    const posts = await this.postRepository.find({ profile })
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

  deletePost(id: string, user: User):Promise<boolean>{
    return this.postRepository.deletePost(id,user)
  }
}
