import { IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ minLength: 4, maxLength: 20 })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  login: string;

  @ApiProperty({ minLength: 8, maxLength: 20 })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}
