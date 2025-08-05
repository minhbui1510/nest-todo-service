import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';

import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { ApiError } from '../../common/decorator/api-error.decorator';
import {Tag} from "../../entities/tags.entity";
// import { TrimPipe } from '../../common/pipe/trim.pipe'; // hiện chưa dùng đến

@ApiTags('tags') // giống 'notes'
@ApiSecurity('x-api-key')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Tạo tag', type: Tag })
  @ApiError(400, 'Dữ liệu không hợp lệ', '/tags')
  create(@Body() dto: CreateTagDto) {
    return this.tagsService.create(dto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Danh sách tag', type: [Tag] })
  findAll() {
    return this.tagsService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Chi tiết tag', type: Tag })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tagsService.findOne(id);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Cập nhật tag', type: Tag })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTagDto) {
    return this.tagsService.update(id, dto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Xóa tag' })
  remove(@Param('id', ParseIntPipe) id: number) {
    this.tagsService.remove(id);
    return { message: 'Đã xóa tag' };
  }
}
