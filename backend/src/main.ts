import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 📌 Configuration de Swagger
  const config = new DocumentBuilder()
    .setTitle('Dashboard API')
    .setDescription('API pour gérer les utilisateurs')
    .setVersion('1.0')
    .build();

  // 📌 Création et mise en place de Swagger
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // 👇 Active la validation globale
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
