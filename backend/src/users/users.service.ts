import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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

  findOne(id: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(newUser);
  }

  async update(id: string, updates: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) throw new NotFoundException (`User ${id} not found`);

    Object.assign(user, updates);
    return this.usersRepository.save(user);
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.usersRepository.delete(id);
    return { message: `User ${id} deleted successfully` };
  }
}

