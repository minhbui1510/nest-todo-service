import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsOptional, IsInt, Min } from 'class-validator';

export class CreateNoteDto {
  @ApiProperty({ example: 'Viết tài liệu NestJS' })
  @IsDefined({ message: 'Tiêu đề là bắt buộc' })
  @IsNotEmpty({ message: 'Tiêu đề không được để trống' })
  title: string;

  @ApiProperty({ example: 'Chi tiết cách dùng module notes với Swagger' })
  @IsNotEmpty({ message: 'Nội dung không được để trống' })
  content: string;

  @ApiProperty({
    example: [1, 2, 3],
    required: false,
    description: 'ID của tag gắn cho note (tùy chọn)',
  })
  @IsOptional()
  tagId?: number[];
}
