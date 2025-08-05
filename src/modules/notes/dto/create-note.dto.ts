import {IsDefined, IsNotEmpty, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class CreateNoteDto {
    @ApiProperty({example: 'Viết tài liệu NestJS'})
    @IsDefined({message: 'Tiêu đề là bắt buộc'})  // 👈 kiểm tra có tồn tại
    @IsNotEmpty({message: 'Tiêu đề không được để trống'}) // 👈 kiểm tra không rỗng
    @IsString()
    title: string;

    @ApiProperty({example: 'Chi tiết cách dùng module notes với Swagger'})
    @IsNotEmpty()
    content: string;
}
