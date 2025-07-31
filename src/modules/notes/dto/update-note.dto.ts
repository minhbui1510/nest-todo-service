import { IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateNoteDto {
  @ApiPropertyOptional({ example: 'Tiêu đề mới' })
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ example: 'Nội dung mới' })
  @IsOptional()
  content?: string;
}
