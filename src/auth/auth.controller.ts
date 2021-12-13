import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './user.entity';
import { GetUser } from '../common/get-user.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ApiBody } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  create(@Body() user: UserDto) {
    return this.authService.create(user);
  }

  @ApiBody({ required: true, type: UserDto })
  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@GetUser() user: UserEntity) {
    return this.authService.login(user);
  }
}
