import { Injectable, NotFoundException } from '@nestjs/common';
import { PostEntity } from './post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostDto } from './dto/post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
  ) {}

  async getAllPosts(category?: string): Promise<PostEntity[]> {
    return category
      ? this.getAllByCategory(category)
      : this.postRepository.find({
          order: {
            creationDate: 'ASC',
          },
        });
  }

  async getPostById(id: number): Promise<PostEntity> {
    const res = await this.postRepository.findOne({ where: { id } });
    if (!res) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    return res;
  }

  async createPost(postDto: PostDto): Promise<PostEntity> {
    const { text, categoryNames } = postDto;
    const categories = categoryNames.map((categoryName) => ({
      name: categoryName,
    }));
    const newPost = this.postRepository.create({ text, categories });
    await this.postRepository.save(newPost);
    return newPost;
  }

  async getAllByCategory(name: string): Promise<PostEntity[]> {
    return await this.postRepository
      .createQueryBuilder('post')
      .innerJoin('post.categories', 'category', 'category.name = :name', {
        name,
      })
      .innerJoinAndSelect('post.categories', 'c')
      .orderBy('post.creationDate')
      .getMany();
  }
}
