import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';

@Injectable()
export class NotesService {
  private notes: Note[] = [];
  private idCounter = 1;

  create(dto: CreateNoteDto): Note {
    if (this.notes.find(n => n.title === dto.title)) {
      throw new Error('Tiêu đề không được trùng nhau');
    }

    const note: Note = {
      id: this.idCounter++,
      title: dto.title,
      content: dto.content,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.notes.push(note);
    return note;
  }

  findAll(): Note[] {
    return this.notes;
  }

  findOne(id: number): Note {
    const note = this.notes.find(n => n.id === id);
    if (!note) throw new NotFoundException('Không tìm thấy ghi chú');
    return note;
  }

  update(id: number, dto: UpdateNoteDto): Note {
    const note = this.findOne(id);
    if (dto.title && dto.title !== note.title) {
      if (this.notes.find(n => n.title === dto.title)) {
        throw new Error('Tiêu đề không được trùng nhau');
      }
      note.title = dto.title;
    }
    if (dto.content) note.content = dto.content;
    note.updatedAt = new Date();
    return note;
  }

  remove(id: number): void {
    const index = this.notes.findIndex(n => n.id === id);
    if (index === -1) throw new NotFoundException('Không tìm thấy ghi chú');
    this.notes.splice(index, 1);
  }
}
