import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginResponse } from './interface/login-response.interface';
import { loginDto } from './dto/login.dto';
import { refreshAccessTokenDto } from './dto/refresh-access-token.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtGuard } from 'src/guard/jwt.guard';
import { GetUser } from './get-user.decorator';
import { User } from 'src/users/entity/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: loginDto): Promise<LoginResponse> {
    return this.authService.login(loginDto);
  }

  @Post('refresh-token')
  async refreshToken(
    @Body() refreshTokenDto: refreshAccessTokenDto,
  ): Promise<{ access_token: string }> {
    return this.authService.refreshAccessToken(refreshTokenDto);
  }

  @Post('/:id/revoke')
  @UseGuards(JwtGuard)
  async revokeRefreshToken(@Param('id') id: string): Promise<void> {
    return this.authService.revokeRefreshToken(id);
  }
}
