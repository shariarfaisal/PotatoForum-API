import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { SocialEntity } from './social.entity'
import { Post } from '../post/post.entity'
import { Comment } from '../comment/comment.entity'


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

  @Column({ unique: true})
  email: string;

  @Column(type => SocialEntity)
  social: SocialEntity;

  @Column({ nullable: true})
  imageUrl: string;

  @OneToMany(type => Post, post => post.profile, { eager: false, onDelete: 'CASCADE' })
  posts: Post[]

  @OneToMany(type => Comment, comment => comment.profile, { eager: false, onDelete: 'CASCADE' })
  comments: Comment[]
}
