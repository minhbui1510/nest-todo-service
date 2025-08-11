import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards, UsePipes } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Note } from '../../entities/note.entity';
import { TrimPipe } from '../../common/pipe/trim.pipe';
import { ApiError } from '../../common/decorator/api-error.decorator';
import { FindByTagDto } from './dto/find-by-tag.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SearchNoteDto } from './dto/search-note.dto';
import { User } from '../../common/decorator/user.decorator';
import { UserDto } from '../users/dto/user.dto';

@ApiTags('notes') // 👈 Nhóm route trong Swagger
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Tạo ghi chú', type: Note })
  @ApiError(400, 'Dữ liệu không hợp lệ', '/notes')
  create(@User() user: UserDto, @Body() dto: CreateNoteDto) {
    return this.notesService.create(user.id,dto);
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

  @UsePipes(new TrimPipe())
  @Post('getByTag')
  @ApiResponse({ status: 200, description: 'Lấy ghi chú theo tag', type: Note })
  getByTag(@Body() tag: FindByTagDto) {
    return this.notesService.findAllByTag(tag);
  }

  @UsePipes(new TrimPipe())
  @Post('search')
  @ApiResponse({ status: 200, description: 'Tìm ghi chú ', type: Note })
  search(@User() user: UserDto, @Body() search: SearchNoteDto) {
    return this.notesService.searchNote(user.id,search);
  }
}
