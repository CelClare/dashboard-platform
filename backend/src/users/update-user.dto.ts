import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsIn, IsOptional, IsString, MinLength } from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ example: "Charlie", required: false })
  name?: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({ example: "charlie@example.com", required: false })
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  @ApiProperty({ example: "newpassword123", required: false })
  password?: string;

  @IsOptional()
  @IsIn(["ADMIN", "USER"])
  @ApiProperty({ example: "ADMIN", required: false })
  role?: string;
}
