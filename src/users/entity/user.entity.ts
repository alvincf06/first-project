import { BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    name:string

    @Column({unique:true})
    email:string

    @Column()
    password:string

    @Column()
    salt:string;
}