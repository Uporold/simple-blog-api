import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CommentDto {
  @ApiProperty({ minLength: 10, maxLength: 140 })
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(140)
  text: string;
}
