import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PostEntity } from '../posts/post.entity';
import { UserEntity } from '../auth/user.entity';

@Entity('comment')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @ManyToOne((type) => PostEntity, (post) => post.comments)
  post: PostEntity;
  @Column()
  postId: number;

  @ManyToOne((type) => UserEntity, (user) => user.comments, { eager: true })
  user: UserEntity;
}
