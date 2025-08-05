import {Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe, UsePipes} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import {ApiTags, ApiResponse, ApiSecurity} from '@nestjs/swagger';
import { Note } from '../../entities/note.entity';
import {TrimPipe} from "../../common/pipe/trim.pipe";
import {ApiError} from "../../common/decorator/api-error.decorator";

@ApiTags('notes') // 👈 Nhóm route trong Swagger
@ApiSecurity('x-api-key')
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Tạo ghi chú', type: Note })
  @ApiError(400, 'Dữ liệu không hợp lệ', '/notes')
  create(@Body() dto: CreateNoteDto) {
    return this.notesService.create(dto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Danh sách ghi chú', type: [Note] })
  findAll() {
    return this.notesService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Chi tiết ghi chú', type: Note })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.notesService.findOne(id);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Cập nhật ghi chú', type: Note })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateNoteDto) {
    return this.notesService.update(id, dto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Xóa ghi chú' })
  remove(@Param('id', ParseIntPipe) id: number) {
    this.notesService.remove(id);
    return { message: 'Đã xóa ghi chú' };
  }
}
