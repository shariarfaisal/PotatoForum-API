import { Controller, Query, Param, Body, Get, Post, Put, Delete, UseGuards, ValidationPipe, ParseUUIDPipe } from '@nestjs/common';
import { GetUser } from '../user/get-user.decorator'
import { AuthGuard  } from '@nestjs/passport'
import { User } from '../user/user.entity'
import { PostService } from './post.service'
import { Post as PostEntity } from './post.entity'
import { PostDto } from './dto/post.dto'
import { Comment } from '../comment/comment.entity'
import { GetPostFilterDto } from './dto/get-post-filter.dto'

@Controller('post')
export class PostController {
  constructor(
    private postService: PostService
  ){}

  @Get('/')
  getPosts(@Query() query: GetPostFilterDto): Promise<PostEntity[]>{
    return this.postService.getPosts(query)
  }

  @Get('/:profileId/user')
  getPostsByProfile(@Param('profileId',ParseUUIDPipe) profileId: string): Promise<PostEntity[]>{
    return this.postService.getPostsByProfileId(profileId)
  }

  @Get('/:postId')
  getPostById(@Param('postId',ParseUUIDPipe) postId: string): Promise<PostEntity>{
    return this.postService.getPostById(postId)
  }

  @Get('/:postId/comments')
  getComments(@Param('postId',ParseUUIDPipe) postId: string): Promise<Comment[]>{
    return this.postService.getCommentsByPostId(postId)
  }

  @Get('/:postId/comments/:commentId')
  getCommentById(
    @Param('postId',ParseUUIDPipe) postId: string,
    @Param('commentId',ParseUUIDPipe) commentId: string
  ): Promise<Comment>{
    return this.postService.getCommentById(postId,commentId)
  }

  @Post('/')
  @UseGuards(AuthGuard())
  createPost(@Body(ValidationPipe) dto: PostDto, @GetUser() user: User): Promise<PostEntity> {
    return this.postService.createPost(dto,user)
  }

  @Put('/:postId')
  @UseGuards(AuthGuard())
  updatePost(@Param('postId',ParseUUIDPipe) postId: string, @Body(ValidationPipe) dto: PostDto, @GetUser() user: User): Promise<PostEntity>{
    return this.postService.updatePost(postId,dto,user)
  }

  @Put('/:postId/publish')
  @UseGuards(AuthGuard())
  publishHandler(
    @GetUser() user: User,
    @Param('postId',ParseUUIDPipe) postId: string,
    @Body() dto: {published: boolean }
  ): Promise<PostEntity>{
    return this.postService.publishHandler(postId,dto,user)
  }


  @Delete('/:postId')
  @UseGuards(AuthGuard())
  deletePost(@Param('postId',ParseUUIDPipe) postId: string, @GetUser() user: User): Promise<boolean>{
    return this.postService.deletePost(postId,user)
  }

}
