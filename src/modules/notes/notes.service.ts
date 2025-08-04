import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { BaseService } from '../../common/base/base.service';
import {RequestContextService} from "../../common/context/request-context/request-context.service"; // hoặc nơi bạn lưu file

@Injectable()
export class NotesService extends BaseService {
  constructor(
    private readonly prisma: PrismaService,
    protected readonly context: RequestContextService, // 👈 inject từ Nest container
  ) {
    super(context); // 👈 truyền context vào BaseService
  }

  async create(dto: CreateNoteDto) {
    try {
      return await this.prisma.note.create({ data: dto });
    } catch (err) {
      this.handleError(err, 'create');
    }
  }

  async findAll() {
    try {
      return await this.prisma.note.findMany();
    } catch (err) {
      this.handleError(err, 'findAll');
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.note.findUnique({ where: { id } });
    } catch (err) {
      this.handleError(err, 'findOne');
    }
  }

  async update(id: number, dto: UpdateNoteDto) {
    try {
      return await this.prisma.note.update({ where: { id }, data: dto });
    } catch (err) {
      this.handleError(err, 'update');
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.note.delete({ where: { id } });
    } catch (err) {
      this.handleError(err, 'remove');
    }
  }
}
