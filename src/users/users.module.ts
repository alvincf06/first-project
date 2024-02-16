import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repository/user.repository';
import { UsersController } from './users.controller';
import { User } from 'src/users/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, UserRepository],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
