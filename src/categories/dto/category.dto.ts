import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryDto {
  @ApiProperty({ minLength: 3, maxLength: 20 })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @Transform(({ value }) => typeof value === 'string' && value.toLowerCase())
  name: string;
}
