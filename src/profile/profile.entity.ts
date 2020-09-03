import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { SocialEntity } from './social.entity'



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

  @Column({ nullable: false })
  userId: string;
}
