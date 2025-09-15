import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    // Persistence des données dans une DB relationnelle (PostgreSQL ici) avec TypeORM
    private usersRepository: Repository<User>
  ) {}
  
  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(newUser);
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.usersRepository.delete(id);
    return { message: `User ${id} deleted successfully` };
  }
}

