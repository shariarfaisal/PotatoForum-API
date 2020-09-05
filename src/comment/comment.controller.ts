import { Controller, Param, Get, Post, Put, Delete, Body, UseGuards } from '@nestjs/common';
import { GetUser } from '../user/get-user.decorator'
import { User } from '../user/user.entity'
import { AuthGuard  } from '@nestjs/passport'
import { CommentService } from './comment.service'
import { CommentDto } from './dto/comment.dto'
import { Comment } from './comment.entity'

@Controller('comment')
@UseGuards(AuthGuard())
export class CommentController {
  constructor(
    private commentService: CommentService
  ){}

  @Get('/:commentId')
  getCommentById(@Param('commentId') id: string): Promise<Comment>{
    return this.commentService.getCommentById(id)
  }

  @Post('/:postId')
  createComment(
    @Param('postId') id: string,
    @Body() dto: CommentDto,
    @GetUser() user: User
  ): Promise<Comment>{
    return this.commentService.createComment(id, dto, user)
  }

  @Put('/:commentId')
  updateComment(
    @Param('commentId') commentId: string,
    @Body() dto: CommentDto,
    @GetUser() user: User
  ){
    return this.commentService.updateComment(commentId, dto, user)
  }

  @Delete('/:commentId')
  deleteComment(
    @Param('commentId') id: string,
    @GetUser() user: User
  ): Promise<boolean>{
    return this.commentService.deleteComment(id, user)
  }
}
