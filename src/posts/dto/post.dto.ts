import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class PostDto {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsNotEmpty()
  @IsString({ each: true })
  @Transform(
    ({ value }) =>
      Array.isArray(value) && value.map((category) => category.toLowerCase()),
  )
  categoryNames: string[];
}
