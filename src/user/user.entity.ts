import {Entity, PrimaryGeneratedColumn, Column, /*Unique,*/ BaseEntity, OneToOne} from "typeorm";
import { UserRole } from './user-role.enum'
import { Profile } from '../profile/profile.entity'

@Entity()
// @Unique(['username', 'email'])
export class User extends BaseEntity{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true})
    username: string;

    @Column({ unique: true})
    email: string;

    @Column()
    isActive: boolean;

    @Column()
    banned: boolean;

    @Column()
    role: UserRole;

    @Column()
    password: string;

    @OneToOne(type => Profile, profile => profile.user, { eager: true })
    profile: Profile;

    // @OneToMany(type => Task, task => task.user, { eager: true })
    // tasks: Task[]

}
