import {Entity, PrimaryGeneratedColumn, Column, /*Unique,*/ BaseEntity} from "typeorm";

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
    role: number;

    @Column()
    password: string;

}
