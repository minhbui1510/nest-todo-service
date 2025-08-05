import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/context/prisma.service';

@Injectable()
export class TagsNoteService {
  constructor(private readonly prisma: PrismaService) {}

async attachMany(tagIds: number[], noteId: number) {
  try {
    return await this.prisma.$transaction(
      tagIds.map((tagId) =>
        this.prisma.tagNote.create({
          data: { tagId, noteId },
        }),
      ),
    );
  } catch (err) {
    throw new Error(`Failed to attach tag to notes: ${err.message}`);
  }
}


  async detach(tagId: number, noteId: number) {
    try {
      return await this.prisma.tagNote.delete({
        where: {
          tagId_noteId: {
            tagId,
            noteId,
          },
        },
      });
    } catch (err) {
      throw new Error(`Failed to detach tag from note: ${err.message}`);
    }
  }
}
