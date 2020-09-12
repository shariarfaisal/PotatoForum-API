import { Controller, Get } from '@nestjs/common';

@Controller('app')
export class AppController {

  @Get()
  getRoutes(){
    return {
      signin: "/user/signin",
      signup: "/user/signup",
      user:{
        getUser: '/user',
        getProfile: '/user/profile',
        getUserById: '/user/:userId',
        addSocialLinks: '/user/profile/social',
        getPostsByProfile: '/user/profile/posts',
        getPostsByUserId: '/user/:userId/posts',
        signupUserAdmin: '/user/signup/admin',
        deleteUser: '/user/',
        updateProfile: '/user/profile',
        updatePassword: '/user/password'
      },
      post:{
        getPosts: '/post',
        getPostsByUser: '/post/:userId/user',
        getPostById: '/post/:postId',
        getPostsComments: '/post/:postId/comments',
        getCommentById: '/post/:postId/comments/:commentId',
        createPost: '/post',
        updatePost: '/post/:postId',
        deletePost: '/post/:postId'
      },
      comment:{
        getCommentById: '/comment/:commentId',
        createComment: '/comment/',
        updateComment: '/comment/:commentId',
        deleteComment: '/comment/:commentId'
      }
    }
  }
}
