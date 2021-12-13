import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PostDto {
  @ApiProperty({ minLength: 10, maxLength: 140 })
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(140)
  text: string;

  @ApiProperty({
    type: 'array',
    items: { type: 'string', minLength: 3, maxLength: 20 },
  })
  @IsNotEmpty()
  @IsString({ each: true })
  @MinLength(3, { each: true })
  @MaxLength(20, { each: true })
  @Transform(
    ({ value }) =>
      Array.isArray(value) && value.map((category) => category.toLowerCase()),
  )
  categoryNames: string[];
}
