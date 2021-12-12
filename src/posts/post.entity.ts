import {
  AfterInsert,
  AfterLoad,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CategoryEntity } from '../categories/category.entity';
import { CommentEntity } from '../comments/comment.entity';

@Entity('post')
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @CreateDateColumn()
  creationDate: Date;

  @ManyToMany(() => CategoryEntity, (category) => category.posts, {
    eager: true,
    cascade: ['insert'],
  })
  @JoinTable()
  categories: CategoryEntity[];
  categoryNames: string[];

  @OneToMany((type) => CommentEntity, (comment) => comment.post)
  comments: CommentEntity[];

  @AfterLoad()
  @AfterInsert()
  getCategories() {
    if (this.categories) {
      this.categoryNames = this.categories.map((category) => category.name);
      delete this.categories;
    }
  }
}
