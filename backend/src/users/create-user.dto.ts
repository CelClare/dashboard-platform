import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

// DTO : Data Transfer Object : objet qui définit la structure des données échangées entre le client et le serveur
// Ici on définit la structure des données pour créer un utilisateur (validation entrée API)

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({example : 'Charlie'})
    name: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({example : 'charlie@example.com'})
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @ApiProperty({example : 'password123'})
    password: string;

    @IsOptional()
    @IsString()
    @ApiProperty({example : 'USER', required: false})
    role?: string;
}
