import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoryEntity } from './category.entity';
import { CategoryDto } from './dto/category.dto';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  getAllCategories(): Promise<CategoryEntity[]> {
    return this.categoriesService.getAllCategories();
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  createCategory(@Body() categoryDto: CategoryDto): Promise<CategoryEntity> {
    return this.categoriesService.createCategory(categoryDto);
  }
}
