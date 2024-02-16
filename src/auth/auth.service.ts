import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { loginDto } from './dto/login.dto';
import { LoginResponse } from './interface/login-response.interface';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshTokenRepository } from './repository/refresh-token.repository';
import { refreshTokenConfig } from 'src/config/jwt.config';
import { refreshAccessTokenDto } from './dto/refresh-access-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    @InjectRepository(RefreshTokenRepository)
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  async login(loginDto: loginDto): Promise<LoginResponse> {
    const { email, password } = loginDto;

    const user = await this.userService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException('Wrong email or password');
    }

    const access_token = await this.createAccesToken(user);
    const refresh_token = await this.createRefreshToken(user);

    return { access_token, refresh_token } as LoginResponse;
  }

  async createAccesToken(user: User): Promise<string> {
    const payload = {
      sub: user.id,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return accessToken;
  }

  async createRefreshToken(user: User): Promise<string> {
    const refreshToken = await this.refreshTokenRepository.createRefreshToken(
      user,
      +refreshTokenConfig.expiresIn,
    );
    const payload = {
      jId: refreshToken.id,
    };
    const refresh_token = await this.jwtService.signAsync(
      payload,
      refreshTokenConfig,
    );
    return refresh_token;
  }

  async refreshAccessToken(
    refreshTokenDto: refreshAccessTokenDto,
  ): Promise<{ access_token: string }> {
    const { refresh_token } = refreshTokenDto;
    const payload = await this.decodeToken(refresh_token);
    const refreshToken = await this.refreshTokenRepository.findOne({
      where: { id: payload.jId },
      relations: ['user'],
    });

    if (!refreshToken) {
      throw new UnauthorizedException('refresh token is not found');
    }

    if (refreshToken.isRevoked) {
      throw new UnauthorizedException('refresh token has been revoked');
    }

    const access_token = await this.createAccesToken(refreshToken.user);

    return { access_token };
  }

  async decodeToken(token: string): Promise<any> {
    try {
      return await this.jwtService.verifyAsync(token);
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw new UnauthorizedException('refresh token is expired');
      } else {
        throw new InternalServerErrorException('failed decode token');
      }
    }
  }
}
