import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/posts.module';
import { CategoriesModule } from './categories/categories.module';
import { CommentsModule } from './comments/comments.module';
import { AuthModule } from './auth/auth.module';
import options from './common/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(options),
    PostsModule,
    CategoriesModule,
    CommentsModule,
    AuthModule,
  ],
})
export class AppModule {}
