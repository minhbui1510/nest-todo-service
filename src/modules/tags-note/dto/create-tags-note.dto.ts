import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsInt, Min } from 'class-validator';

export class CreateTagNoteDto {
  @ApiProperty({ example: 1, description: 'ID của Tag' })
  @IsDefined({ message: 'tagId là bắt buộc' })
  @IsInt({ message: 'tagId phải là số nguyên' })
  @Min(1, { message: 'tagId phải >= 1' })
  tagId: number;

  @ApiProperty({ example: 42, description: 'ID của Note' })
  @IsDefined({ message: 'noteId là bắt buộc' })
  @IsInt({ message: 'noteId phải là số nguyên' })
  @Min(1, { message: 'noteId phải >= 1' })
  noteId: number;
}
