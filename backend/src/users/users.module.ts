import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // indispensable pour injecter UserRepository
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // pour réutiliser le service ailleurs si besoin
})
export class UsersModule {}
