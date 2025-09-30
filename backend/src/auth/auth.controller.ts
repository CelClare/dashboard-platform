import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { Public } from 'src/common/decorators/public.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  register(@Body() dto: CreateUserDto) {
    return this.auth.register(dto);
  }

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Login and get a JWT' })
  @ApiBody({ type: LoginDto })
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto.email, dto.password);
  }

  @ApiBearerAuth('jwt')
  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get current user from JWT' })
  me(@Req() req: any) {
    return req.user; // { sub, email, role, iat, exp }
  }
}
