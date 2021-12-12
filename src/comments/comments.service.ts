import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './comment.entity';
import { Repository } from 'typeorm';
import { CommentDto } from './dto/comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,
  ) {}

  async getPostComments(postId: number): Promise<CommentEntity[]> {
    return await this.commentRepository.find({ where: { postId } });
  }

  async createComment(
    commentDto: CommentDto,
    postId: number,
  ): Promise<CommentEntity> {
    const newComment = this.commentRepository.create({ ...commentDto, postId });
    await this.commentRepository.save(newComment);
    return newComment;
  }
}
