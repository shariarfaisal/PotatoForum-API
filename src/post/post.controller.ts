import { Controller, Param, Body, Get, Post, Put, Delete, UseGuards, ValidationPipe } from '@nestjs/common';
import { GetUser } from '../user/get-user.decorator'
import { AuthGuard  } from '@nestjs/passport'
import { User } from '../user/user.entity'
import { PostService } from './post.service'
import { Post as PostEntity } from './post.entity'
import { PostDto } from './dto/post.dto'
import { Comment } from '../comment/comment.entity'

@Controller('post')
@UseGuards(AuthGuard())
export class PostController {
  constructor(
    private postService: PostService
  ){}

  @Get('/')
  getPosts(): Promise<PostEntity[]>{
    return this.postService.getPosts()
  }

  @Get('/:userId/user')
  getPostsByUser(@Param('userId') id: string): Promise<PostEntity[]>{
    return this.postService.getPostsByUser(id)
  }

  @Get('/:postId')
  getPost(@Param('postId') postId: string): Promise<PostEntity>{
    return this.postService.getPostById(postId)
  }

  @Get('/:postId/comments')
  getComments(@Param('postId') postId: string): Promise<Comment[]>{
    return this.postService.getCommentsByPostId(postId)
  }

  @Get('/:postId/comments/:commentId')
  getCommentById(
    @Param('postId') postId: string,
    @Param('commentId') commentId: string
  ): Promise<Comment>{
    return this.postService.getCommentById(postId,commentId)
  }

  @Post('/')
  createPost(@Body(ValidationPipe) dto: PostDto, @GetUser() user: User): Promise<PostEntity> {
    return this.postService.createPost(dto,user)
  }

  @Put('/:id')
  updatePost(@Param('id') id: string, @Body(ValidationPipe) dto: PostDto, @GetUser() user: User): Promise<PostEntity>{
    return this.postService.updatePost(id,dto,user)
  }

  @Delete('/:id')
  deletePost(@Param('id') id: string, @GetUser() user: User): Promise<boolean>{
    return this.postService.deletePost(id,user)
  }
}
