import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { GetPostId } from '../common/get-post-id.decorator';
import { CommentDto } from './dto/comment.dto';
import { CommentEntity } from './comment.entity';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Get(':postId')
  getPostComments(@GetPostId() postId: number): Promise<CommentEntity[]> {
    return this.commentsService.getPostComments(postId);
  }

  @Post(':postId')
  createComment(
    @Body() commentDto: CommentDto,
    @GetPostId() postId: number,
  ): Promise<CommentEntity> {
    return this.commentsService.createComment(commentDto, postId);
  }
}
