import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'secret123' })
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'Nguyễn Văn A' })
  @IsNotEmpty()
  name: string;
}
