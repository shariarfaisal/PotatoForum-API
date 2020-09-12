import {Entity, PrimaryGeneratedColumn, Column, /*Unique,*/ BaseEntity, OneToOne, JoinColumn} from "typeorm";
import { UserRole } from './user-role.enum'
import { Profile } from './profile.entity'

@Entity()
// @Unique(['username', 'email'])
export class User extends BaseEntity{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true})
    username: string;

    @Column({ unique: true})
    email: string;

    @Column({ unique: true, nullable: true })
    contact: string;


    @Column()
    isActive: boolean;

    @Column()
    banned: boolean;

    @Column()
    role: UserRole;

    @Column()
    password: string;

    @OneToOne(type => Profile,{ eager: true, onDelete: 'CASCADE' })
    @JoinColumn()
    profile: Profile;


}
