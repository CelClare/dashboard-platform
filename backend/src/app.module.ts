import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import * as Joi from 'joi';
import { AuthModule } from './auth/auth.module';

// Les fichiers module de NestJS sont là pour relier les Controllers, services et imports de modules. 
// NestJS permet ceci contrairement à d'autres frameworks où tout est dans un seul fichier : le main ou index.

// Ici on configure la connexion à la base de données avec TypeORM et les variables d'environnement avec ConfigModule
// On importe aussi le module UsersModule qui contient le controller et service des utilisateurs.

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().default(5432),
        DATABASE_USER: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.string().default('1h')
      }),
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [User],
        synchronize: process.env.NODE_ENV !== 'production',
      }),
    }),

    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
