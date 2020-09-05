import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from 'typeorm'
import { SocialEntity } from './social.entity'
import { Post } from '../post/post.entity'
import { Comment } from '../comment/comment.entity'
import { User } from '../user/user.entity'


@Entity()
export class Profile extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true})
  work: string;

  @Column({ nullable: true})
  address: string;

  @Column()
  email: string;

  @Column(type => SocialEntity)
  social: SocialEntity;

  @Column({ nullable: true})
  imageUrl: string;

  @OneToOne(type => User, user => user.profile, { eager: false })
  user: User

  @OneToMany(type => Post, post => post.profile, { eager: false })
  posts: Post[]

  @OneToMany(type => Comment, comment => comment.profile, { eager: false })
  comments: Comment[]
}
