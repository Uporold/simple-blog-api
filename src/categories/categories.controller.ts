import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoryEntity } from './category.entity';
import { CategoryDto } from './dto/category.dto';
import { CategoriesService } from './categories.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  getAllCategories(): Promise<CategoryEntity[]> {
    return this.categoriesService.getAllCategories();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiBearerAuth('jwt')
  createCategory(@Body() categoryDto: CategoryDto): Promise<CategoryEntity> {
    return this.categoriesService.createCategory(categoryDto);
  }
}
