import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Exclude, instanceToPlain } from 'class-transformer';
import { UNIQUE_USER_LOGIN_CONSTRAINT } from './constraints';

@Entity('user')
@Unique(UNIQUE_USER_LOGIN_CONSTRAINT, ['login'])
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  login: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  private toJSON() {
    return instanceToPlain(this);
  }
}
