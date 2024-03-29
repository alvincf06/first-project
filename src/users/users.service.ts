import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async findUserById(id: string): Promise<User> {
    return await this.userRepository.findOne({ where: { id: id } });
  }
  async createUser(createUserDto: CreateUserDto): Promise<void> {
    return await this.userRepository.createUser(createUserDto);
  }

  async validateUser(email: string, password: string): Promise<User> {
    return await this.userRepository.validateUser(email, password);
  }
}
