import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateTagDto {
  @ApiProperty({ example: 'Urgent', description: 'Tên tag, phải duy nhất' })
  @IsDefined({ message: 'Tên tag là bắt buộc' })
  @IsString({ message: 'Tên tag phải là chuỗi' })
  @IsNotEmpty({ message: 'Tên tag không được để trống' })
  name: string;

  @ApiProperty({ example: '#FF0000', description: 'Màu của tag (mã HEX, có hoặc không có #)' })
  @IsDefined({ message: 'Màu tag là bắt buộc' })
  @IsString({ message: 'Màu tag phải là chuỗi' })
  @IsNotEmpty({ message: 'Màu tag không được để trống' })
  @Matches(/^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: 'Màu phải là mã HEX hợp lệ (ví dụ: #FF0000 hoặc F00)',
  })
  tag_color: string;

  @ApiProperty({ example: 'Công việc cần làm ngay', description: 'Nội dung/ghi chú cho tag' })
  @IsDefined({ message: 'Nội dung tag là bắt buộc' })
  @IsString({ message: 'Nội dung tag phải là chuỗi' })
  @IsNotEmpty({ message: 'Nội dung tag không được để trống' })
  tag_content: string;
}
