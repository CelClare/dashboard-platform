import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateUserDto } from './update-user.dto';

// 📌 Décorateurs Swagger pour la doc API
// Les décorateurs Swagger permettent de décrire les endpoints de l'API et leurs paramètres


@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Liste tous les utilisateurs' })
  @ApiResponse({ status: 200, description: 'Liste des utilisateurs récupérée avec succès.' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupère un utilisateur par son ID' })
  @ApiParam({ name: 'id', required: true, example: 'uuid-user-id' })
  @ApiResponse({ status: 200, description: 'Utilisateur récupéré avec succès.' })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé.' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Ajoute un nouvel utilisateur' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'Utilisateur créé avec succès.' })
  @ApiResponse({ status: 400, description: 'Requête invalide.' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Met à jour un utilisateur par son ID' })
  @ApiParam({ name: 'id', required: true, example: 'uuid-user-id' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'Utilisateur mis à jour avec succès.' })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé.' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprime un utilisateur par son ID' })
  @ApiParam({ name: 'id', required: true, example: 'uuid-user-id' })
  @ApiResponse({ status: 200, description: 'Utilisateur supprimé avec succès.', schema: {
  example: { message: 'User uuid-user-id deleted successfully' }
  }})
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé.' })
  delete(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
