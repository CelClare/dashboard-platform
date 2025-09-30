import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { OwnershipGuard } from 'src/common/guards/owner-ship.guards';

// 📌 Décorateurs Swagger pour la doc API, ils permettent de décrire les endpoints de l'API et leurs paramètres

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth('jwt')
  @Get()
  @UseGuards(AuthGuard('jwt'))
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Liste tous les utilisateurs' })
  @ApiResponse({
    status: 200,
    description: 'Liste des utilisateurs récupérée avec succès.',
  })
  findAll() {
    return this.usersService.findAll();
  }

  @ApiBearerAuth('jwt')
  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Récupère un utilisateur par son ID' })
  @ApiParam({ name: 'id', required: true, example: 'user-id' })
  @ApiResponse({
    status: 200,
    description: 'Utilisateur récupéré avec succès.',
  })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé.' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @ApiBearerAuth('jwt')
  @Post()
  @UseGuards(AuthGuard('jwt'))
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Ajoute un nouvel utilisateur' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'Utilisateur créé avec succès.' })
  @ApiResponse({ status: 400, description: 'Requête invalide.' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiBearerAuth('jwt')
  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), OwnershipGuard)
  @ApiOperation({ summary: 'Met à jour un utilisateur par son ID' })
  @ApiParam({ name: 'id', required: true, example: 'user-id' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    description: 'Utilisateur mis à jour avec succès.',
  })
  @ApiResponse({ status: 403, description: 'Accès refusé : pas propriétaire.' })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé.' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiBearerAuth('jwt')
  @Patch(':id/deactivate')
  @UseGuards(AuthGuard('jwt'), OwnershipGuard)
  @ApiOperation({ summary: 'Désactive un utilisateur (soft delete)' })
  @ApiParam({ name: 'id', required: true, example: 'user-id' })
  @ApiResponse({
    status: 200,
    description: 'Utilisateur désactivé avec succès.',
  })
  @ApiResponse({ status: 403, description: 'Accès refusé : pas propriétaire.' })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé.' })
  deactivate(@Param('id') id: string) {
    return this.usersService.deactivate(id);
  }

  @ApiBearerAuth('jwt')
  @Patch(':id/restore')
  @UseGuards(AuthGuard('jwt'))
  @Roles('ADMIN') // Seul un admin peut réactiver
  @ApiOperation({ summary: 'Restaure un utilisateur désactivé' })
  @ApiParam({ name: 'id', required: true, example: 'user-id' })
  @ApiResponse({
    status: 200,
    description: 'Utilisateur restauré avec succès.',
  })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé.' })
  restore(@Param('id') id: string) {
    return this.usersService.restore(id);
  }

  @ApiBearerAuth('jwt')
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), OwnershipGuard)
  @ApiOperation({ summary: 'Supprime un utilisateur par son ID' })
  @ApiParam({ name: 'id', required: true, example: 'user-id' })
  @ApiResponse({
    status: 200,
    description: 'Utilisateur supprimé avec succès.',
    schema: {
      example: { message: 'User user-id deleted successfully' },
    },
  })
  @ApiResponse({ status: 403, description: 'Accès refusé : pas propriétaire.' })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé.' })
  delete(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
