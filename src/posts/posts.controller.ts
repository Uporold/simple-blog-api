import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostDto } from './dto/post.dto';
import { GetPostId } from '../common/get-post-id.decorator';
import { PostEntity } from './post.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { GetUser } from '../common/get-user.decorator';
import { UserEntity } from '../auth/user.entity';

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @Get()
  @ApiQuery({ name: 'category', required: false })
  getAllPosts(@Query('category') category: string): Promise<PostEntity[]> {
    return this.postService.getAllPosts(category);
  }

  @Get(':postId')
  @ApiParam({ name: 'postId', required: true })
  getPostById(@GetPostId() postId: number): Promise<PostEntity> {
    return this.postService.getPostById(postId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiBearerAuth('jwt')
  createPost(
    @GetUser() user: UserEntity,
    @Body() post: PostDto,
  ): Promise<PostEntity> {
    return this.postService.createPost(post, user);
  }
}
