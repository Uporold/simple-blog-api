import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { GetPostId } from '../common/get-post-id.decorator';
import { CommentDto } from './dto/comment.dto';
import { CommentEntity } from './comment.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { GetUser } from '../common/get-user.decorator';
import { UserEntity } from '../auth/user.entity';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Get(':postId')
  @ApiParam({ name: 'postId', required: true })
  getPostComments(@GetPostId() postId: number): Promise<CommentEntity[]> {
    return this.commentsService.getPostComments(postId);
  }

  @Post(':postId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('jwt')
  @ApiParam({ name: 'postId', required: true })
  createComment(
    @Body() commentDto: CommentDto,
    @GetPostId() postId: number,
    @GetUser() user: UserEntity,
  ): Promise<CommentEntity> {
    return this.commentsService.createComment(commentDto, postId, user);
  }
}
