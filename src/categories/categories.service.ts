import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './category.entity';
import { Repository } from 'typeorm';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  async getAllCategories(): Promise<CategoryEntity[]> {
    return await this.categoryRepository.find();
  }

  async createCategory(categoryDto: CategoryDto): Promise<CategoryEntity> {
    const newCategory = this.categoryRepository.create(categoryDto);
    await this.categoryRepository.save(newCategory);
    return newCategory;
  }
}
