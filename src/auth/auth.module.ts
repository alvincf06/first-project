import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/jwt.config';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshTokenRepository } from './repository/refresh-token.repository';
import { RefreshTokenEntity } from './entity/refresh-token..entity';

@Module({
  imports: [
    JwtModule.register(jwtConfig),
    TypeOrmModule.forFeature([RefreshTokenEntity]),
    UsersModule,
  ],
  providers: [AuthService, RefreshTokenRepository],
  controllers: [AuthController],
})
export class AuthModule {}
