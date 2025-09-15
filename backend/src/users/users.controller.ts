import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';

// 📌 Décorateurs Swagger pour la doc API
// Les décorateurs Swagger permettent de décrire les endpoints de l'API et leurs paramètres


@ApiTags('Users') // 📌 Catégorie dans Swagger
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
  @ApiBody({ type: CreateUserDto })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprime un utilisateur par son ID' })
  @ApiParam({ name: 'id', required: true, example: 1 })
  delete(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
