import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UsersService,
    private readonly jwt: JwtService,
  ) {}

  async register(dto: CreateUserDto) {
  const result = await this.users.create(dto);
  return {
    success: true,
    message: 'User registered successfully',
    data: {
      id: result.data.id,
      email: result.data.email,
      role: result.data.role,
      name: result.data.name,
    },
  };
}

  async login(email: string, password: string) {
    const user = await this.users.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const ok = await argon2.verify(user.password, password);
    if (!ok) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id, email: user.email, role: user.role };
    const access_token = await this.jwt.signAsync(payload);
    
    return {
      success: true,
      message: 'Login successful',
      data: { access_token },
    };
  }  
}
