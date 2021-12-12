import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import options from './common/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(options)],
})
export class AppModule {}
