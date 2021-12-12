import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostDto } from './dto/post.dto';
import { GetPostId } from '../common/get-post-id.decorator';
import { PostEntity } from './post.entity';

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @Get()
  getAllPosts(@Query('category') category: string): Promise<PostEntity[]> {
    return this.postService.getAllPosts(category);
  }

  @Get(':postId')
  getPostById(@GetPostId() postId: number): Promise<PostEntity> {
    return this.postService.getPostById(postId);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  createPost(@Body() post: PostDto): Promise<PostEntity> {
    return this.postService.createPost(post);
  }
}
