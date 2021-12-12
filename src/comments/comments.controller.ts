import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { GetPostId } from '../common/get-post-id.decorator';
import { CommentDto } from './dto/comment.dto';
import { CommentEntity } from './comment.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Get(':postId')
  getPostComments(@GetPostId() postId: number): Promise<CommentEntity[]> {
    return this.commentsService.getPostComments(postId);
  }

  @Post(':postId')
  @UseGuards(JwtAuthGuard)
  createComment(
    @Body() commentDto: CommentDto,
    @GetPostId() postId: number,
  ): Promise<CommentEntity> {
    return this.commentsService.createComment(commentDto, postId);
  }
}
