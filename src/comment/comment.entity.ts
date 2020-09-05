import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Profile } from '../user/profile.entity'
import { Post } from '../post/post.entity'

@Entity()
export class Comment extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  body: string;

  @ManyToOne(type => Post, post => post.comments,{ eager: false })
  post: Post;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: string;

  @ManyToOne(type => Profile, profile => profile.posts, { eager: true } )
  profile: Profile;

}
