import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import {PrismaService} from "../../prisma/prisma.service";

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateNoteDto) {
    return this.prisma.note.create({ data: dto });
  }

  findAll() {
    return this.prisma.note.findMany();
  }

  findOne(id: number) {
    return this.prisma.note.findUnique({ where: { id } });
  }

  update(id: number, dto: UpdateNoteDto) {
    return this.prisma.note.update({ where: { id }, data: dto });
  }

  remove(id: number) {
    return this.prisma.note.delete({ where: { id } });
  }
}
