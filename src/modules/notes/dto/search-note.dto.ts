import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class SearchNoteDto {
  @ApiPropertyOptional({ example: 'NestJS', description: 'Từ khóa tìm kiếm' })
  @IsOptional()
  @IsString()
  keyword?: string;

  @ApiPropertyOptional({
    example: 1,
    default: 1,
    minimum: 1,
    description: 'Trang hiện tại (bắt đầu từ 1)',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageIndex: number = 1;

  @ApiPropertyOptional({
    example: 10,
    default: 10,
    minimum: 1,
    maximum: 100,
    description: 'Số item mỗi trang',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  pageSize: number = 10;

  // Tiện dụng cho Prisma
  get skip(): number {
    return (this.pageIndex - 1) * this.pageSize;
  }

  get take(): number {
    return this.pageSize;
  }
}
