import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository:UserRepository){

    }

    async createUser(createUserDto:CreateUserDto):Promise<void>{
        return await this.userRepository.createUser(createUserDto);
    }
}
