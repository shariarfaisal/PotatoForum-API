import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity()
export class User extends BaseEntity{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    username: string;

    @Column()
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
