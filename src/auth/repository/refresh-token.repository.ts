import { DataSource, Repository } from 'typeorm';
import { RefreshTokenEntity } from '../entity/refresh-token..entity';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entity/user.entity';

@Injectable()
export class RefreshTokenRepository extends Repository<RefreshTokenEntity> {
  constructor(private dataSource: DataSource) {
    super(RefreshTokenEntity, dataSource.createEntityManager());
  }

  async createRefreshToken(
    user: User,
    ttl: number,
  ): Promise<RefreshTokenEntity> {
    const refreshToken = this.create();

    refreshToken.user = user;
    refreshToken.isRevoked = false;
    const expiredAt = new Date();
    expiredAt.setTime(expiredAt.getTime() + ttl);
    refreshToken.expiredAt = expiredAt;

    return await refreshToken.save();
  }
}
