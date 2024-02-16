import { User } from 'src/users/entity/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class RefreshTokenEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: false })
  isRevoked: boolean;

  @Column()
  expiredAt: Date;

  @ManyToOne(() => User, (user) => user.refreshTokens, {
    eager: true,
  })
  user: User;
}
