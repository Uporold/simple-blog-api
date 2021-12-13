import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Exclude, instanceToPlain } from 'class-transformer';
import { UNIQUE_USER_LOGIN_CONSTRAINT } from './constraints';
import { CommentEntity } from '../comments/comment.entity';
import { PostEntity } from '../posts/post.entity';

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

  @OneToMany((type) => CommentEntity, (comment) => comment.user)
  comments: CommentEntity[];

  @OneToMany((type) => PostEntity, (post) => post.user)
  posts: PostEntity[];

  private toJSON() {
    return instanceToPlain(this);
  }
}
