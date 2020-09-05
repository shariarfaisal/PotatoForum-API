import { Entity, Column } from 'typeorm'


@Entity()
export class SocialEntity{
  @Column({ nullable: true })
  facebook: string;

  @Column({ nullable: true })
  twitter: string;

  @Column({ nullable: true })
  linkedin: string;

  @Column({ nullable: true })
  github: string;

  @Column({ nullable: true })
  web: string;
}
