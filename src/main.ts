import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 4000;

  const config = new DocumentBuilder()
    .setTitle('Simple Blog API')
    .setDescription('Just a simple API')
    .setVersion('1.0')
    .addTag('simple-blog')
    .addBearerAuth(
      { in: 'header', type: 'http', description: 'Enter JWT token' },
      'jwt',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
}
bootstrap();
