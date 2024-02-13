import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Book } from "src/books/entity/books.entity";
import { User } from "src/users/entity/user.entity";

export const typeormConfig: TypeOrmModuleOptions ={
    type: 'mysql',
    host: 'localhost',
    port:3306,
    username:'root',
    password:'',
    database:'first-project',
    entities: [Book,User],
    synchronize: true,
}