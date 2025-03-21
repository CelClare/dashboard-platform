import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')  // 📌 Catégorie dans Swagger
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Liste tous les utilisateurs' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupère un utilisateur par son ID' })
  @ApiParam({ name: 'id', required: true, example: 1 })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Ajoute un nouvel utilisateur' })
  @ApiBody({ schema: { example: { name: 'Charlie' } } })
  create(@Body() createUserDto: { name: string }) {
    return this.usersService.create(createUserDto);
  }
}
