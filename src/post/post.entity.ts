import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm'
import { Profile } from '../user/profile.entity'
import { Comment } from '../comment/comment.entity'

@Entity()
export class Post extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  body: string;

  @Column('simple-array',{ nullable: false })
  tags: string[]

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: string;

  @Column({ default: true, nullable: false })
  published: boolean;

  @ManyToOne(type => Profile, profile => profile.posts, { eager: true } )
  profile: Profile;

  @OneToMany(type => Comment, comment => comment.post, { eager: true, onDelete: 'CASCADE' })
  comments: Comment[]

}
