import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNoteDto {
  @ApiProperty({ example: 'Viết tài liệu NestJS' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Chi tiết cách dùng module notes với Swagger' })
  @IsNotEmpty()
  content: string;
}
