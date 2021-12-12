import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UNIQUE_USER_LOGIN_CONSTRAINT } from './constraints';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async create(userDto: UserDto): Promise<UserEntity> {
    const { login, password } = userDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.userRepository.create({
      login,
      password: hashedPassword,
    });
    try {
      await this.userRepository.save(user);
    } catch (err) {
      console.log(err);
      if (err?.constraint === UNIQUE_USER_LOGIN_CONSTRAINT) {
        throw new ConflictException('User with this login already exists');
      }
      throw new InternalServerErrorException();
    }
    return user;
  }

  async login(
    user: Omit<UserEntity, 'password'>,
  ): Promise<Omit<UserEntity, 'password'> & { token: string }> {
    const payload = { login: user.login };
    const token = await this.jwtService.signAsync(payload);
    return { ...user, token };
  }

  async validateUser(
    login: string,
    password: string,
  ): Promise<Omit<UserEntity, 'password'> | null> {
    const user = await this.userRepository.findOne({ login });
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
