import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    private usersRepository: Repository<User>,
  ) {}

  async findAll() {
    const users = await this.usersRepository.find();
    return {
      success: true,
      message: 'Users retrieved successfully',
      data: users,
    };
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`User ${id} not found`);
    return {
      success: true,
      message: 'User retrieved successfully',
      data: user,
    };
  }

  async findByEmail(email: string) {
    return this.usersRepository.findOneBy({ email }); // utilisé pour login
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = this.usersRepository.create(createUserDto);
      const savedUser = await this.usersRepository.save(newUser);
      return {
        success: true,
        message: 'User created successfully',
        data: savedUser,
      };
    } catch (error) {
      if (error.code === '23505') {
        // Code d'erreur pour violation de contrainte d'unicité dans PostgreSQL
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  async update(id: string, updates: UpdateUserDto) {
    try {
      const user = await this.usersRepository.findOneBy({ id });
      if (!user) throw new NotFoundException(`User ${id} not found`);

      Object.assign(user, updates);
      const updatedUser = await this.usersRepository.save(user);

      return {
        success: true,
        message: 'User updated successfully',
        data: updatedUser,
      };
    } catch (error) {
      if (error.code === '23505') {
        // Code d'erreur pour violation de contrainte d'unicité dans PostgreSQL
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  async deactivate(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`User ${id} not found`);

    user.isActive = false;
    const savedUser = await this.usersRepository.save(user);

    return {
      success: true,
      message: `User ${id} has been deactivated`,
      data: savedUser,
    };
  }

  async restore(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`User ${id} not found`);

    user.isActive = true;
    const savedUser = await this.usersRepository.save(user);

    return {
      success: true,
      message: `User ${id} has been reactivated`,
      data: savedUser,
    };
  }

  async remove(id: string) {
    await this.usersRepository.delete(id);
    return {
      success: true,
      message: `User ${id} deleted successfully`,
    };
  }
}
