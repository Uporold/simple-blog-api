import { Entity, ManyToMany, PrimaryColumn } from 'typeorm';
import { PostEntity } from '../posts/post.entity';

@Entity('category')
export class CategoryEntity {
  @PrimaryColumn()
  name: string;

  @ManyToMany(() => PostEntity, (post) => post.categories)
  posts: PostEntity[];
}
