import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { TaskStatus } from './task-status.enum'
import { User } from '../user/user.entity'

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  // @ManyToOne(type => User, user => user.tasks ,{ eager: false })
  // user: User;
}
