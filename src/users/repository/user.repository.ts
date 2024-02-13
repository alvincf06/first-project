import { EntityRepository, Repository } from "typeorm";
import { User } from "../entity/user.entity";
import { CreateUserDto } from '../dto/createUser.dto';
import * as bcrypt from 'bcrypt'

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async createUser(createUserDto:CreateUserDto):Promise<void>{
        const {name, email, password} = createUserDto;

        const user = this.create()
        user.name = name;
        user.email = email;
        user.salt = await bcrypt.genSalt()
        user.password = await bcrypt.hash(password,user.salt)

        try{
            await user.save();
        }catch(e){
            console.log(e)
        }
    }
}