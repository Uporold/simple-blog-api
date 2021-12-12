import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CategoryDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => typeof value === 'string' && value.toLowerCase())
  name: string;
}