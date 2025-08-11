import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { PrismaService } from '../../common/context/prisma.service';
import { BaseService } from '../../common/base/base.service';
import { RequestContextService } from '../../common/context/request-context.service';
import { TagsNoteService } from '../tags-note/tags-note.service';
import { TagsService } from '../tags/tags.service';
import { FindByTagDto } from './dto/find-by-tag.dto';
import { SearchNoteDto } from './dto/search-note.dto';

@Injectable()
export class NotesService extends BaseService {
  constructor(
    private readonly prisma: PrismaService,
    protected readonly context: RequestContextService, // 👈 inject từ Nest container
    protected readonly tagsNoteService: TagsNoteService, // 👈 inject service quản lý tag\
  ) {
    super(context); // 👈 truyền context vào BaseService
  }

  async create(userId: number, dto: CreateNoteDto) {
    try {
      const newNote = await this.prisma.note.create({
        data: {
          title: dto.title,
          content: dto.content,
          createdBy: String(userId)
        },
      });

      if (newNote?.id && Array.isArray(dto.tagId) && dto.tagId.length > 0) {
        // Kiểm tra tất cả tagId có tồn tại
        const tags = await this.prisma.tag.findMany({
          where: { id: { in: dto.tagId } },
          select: { id: true },
        });

        const existingTagIds = tags.map((t) => t.id);

        // Gắn từng tag tồn tại
        await this.tagsNoteService.attachMany(existingTagIds, newNote.id);
      }

      return await this.prisma.note.findUnique({
        where: { id: newNote.id },
        include: { tag: true }, // chỉ có tác dụng nếu quan hệ 1-1
      });
    } catch (err) {
      this.handleError(err, 'create');
    }
  }


  async findAll() {
    try {
      const notes = await this.prisma.note.findMany({
        orderBy: { createdAt: 'desc' }, // Sắp xếp theo ngày tạo mới nhất
        include: {
          // 'tag' ở đây là quan hệ Note -> TagNote[]
          tag: {
            include: {
              // 'tag' bên trong là quan hệ TagNote -> Tag
              tag: {
                select: {
                  name: true,
                  tag_color: true,
                },
              },
            },
          },
        },
      });

      // Chuẩn hoá output: chèn tagName, tagColor vào từng phần tử trong mảng 'tag'
      return notes.map((n) => ({
        ...n,
        tag: n.tag.map((tn) => ({
          tagId: tn.tagId,
          noteId: tn.noteId,
          createdAt: tn.createdAt,
          tagName: tn.tag?.name ?? null,
          tagColor: tn.tag?.tag_color ?? null,
        })),
      }));
    } catch (err) {
      this.handleError(err, 'findAll');
    }
  }

  async searchNote(userId: number, search: SearchNoteDto) {
    try {
      const [items, total] = await Promise.all([
        await this.prisma.note.findMany({
          where: {
            createdBy: String(userId),
            OR: [
              { title: { contains: search.keyword, mode: 'insensitive' } },
              { content: { contains: search.keyword, mode: 'insensitive' } },
              {
                tag: {
                  some: {
                    tag: {
                      name: { contains: search.keyword, mode: 'insensitive' },
                    },
                  },
                },
              },
            ],
          },
          include: {
            tag: {
              include: {
                tag: {
                  select: { name: true, tag_color: true },
                },
              },
            },
          },
          skip: (search.pageIndex - 1) * search.pageSize, // ✅ offset
          take: search.pageSize,                           // ✅ limit
          orderBy: { createdAt: 'desc' },
        }),
        this.prisma.note.count({
          where: {
            createdBy: String(userId),
            OR: [
              { title: { contains: search.keyword, mode: 'insensitive' } },
              { content: { contains: search.keyword, mode: 'insensitive' } },
              {
                tag: {
                  some: {
                    tag: {
                      name: { contains: search.keyword, mode: 'insensitive' },
                    },
                  },
                },
              },
            ],
          },
        }),
      ]);
      return {
        items: items.map((n) => ({
          ...n,
          tag: n.tag.map((tn) => ({
            tagId: tn.tagId,
            noteId: tn.noteId,
            createdAt: tn.createdAt,
            tagName: tn.tag?.name ?? null,
            tagColor: tn.tag?.tag_color ?? null,
          })),
        })),
        pageIndex: search.pageIndex,
        pageSize: search.pageSize,
        total,
        totalPages: Math.ceil(total / search.pageSize),
      };
    } catch (err) {
      this.handleError(err, 'searchNote');
    }
  }


  async findAllByTag(tag: FindByTagDto) {
    try {
      const notes = await this.prisma.note.findMany({
        where: {
          tag: {
            some: {
              tag: {
                name: tag.tagName,
              },
            },
          },
        },
        include: {
          tag: {
            include: {
              // 'tag' bên trong là quan hệ TagNote -> Tag
              tag: {
                select: {
                  name: true,
                  tag_color: true,
                },
              },
            },
          },
        },
      });
      return notes.map((n) => ({
        ...n,
        tag: n.tag.map((tn) => ({
          tagId: tn.tagId,
          noteId: tn.noteId,
          createdAt: tn.createdAt,
          tagName: tn.tag?.name ?? null,
          tagColor: tn.tag?.tag_color ?? null,
        })),
      }));
    } catch (err) {
      this.handleError(err, 'findAllByTag');
    }
  }

  async findOne(id: number) {
    try {
      const note = await this.prisma.note.findUnique({
        where: { id },
        include: {
          // 'tag' là quan hệ Note -> TagNote[]
          tag: {
            include: {
              // 'tag' bên trong là quan hệ TagNote -> Tag
              tag: {
                select: {
                  name: true,
                  tag_color: true,
                },
              },
            },
          },
        },
      });

      if (!note) return null;

      // Chuẩn hoá output: thêm tagName, tagColor vào từng phần tử trong mảng 'tag'
      return {
        ...note,
        tag: note.tag.map((tn) => ({
          tagId: tn.tagId,
          noteId: tn.noteId,
          createdAt: tn.createdAt,
          tagName: tn.tag?.name ?? null,
          tagColor: tn.tag?.tag_color ?? null,
        })),
      };
    } catch (err) {
      this.handleError(err, 'findOne');
    }
  }

  async update(id: number, dto: UpdateNoteDto) {
    try {
      // 1. Cập nhật nội dung note
      await this.prisma.note.update({
        where: { id },
        data: {
          title: dto.title,
          content: dto.content,
        },
      });

      // 2. Nếu có tagId (list) được gửi
      if (Array.isArray(dto.tagId)) {
        // Xoá toàn bộ tag cũ khỏi note
        await this.prisma.tagNote.deleteMany({
          where: { noteId: id },
        });

        // Lọc ra tagId hợp lệ từ DB
        const existingTags = await this.prisma.tag.findMany({
          where: { id: { in: dto.tagId } },
          select: { id: true },
        });
        const validTagIds = existingTags.map((t) => t.id);

        // Gắn lại các tag mới
        await Promise.all(
          validTagIds.map((tagId) =>
            this.prisma.tagNote.create({
              data: { tagId, noteId: id },
            }),
          ),
        );
      }

      // 3. Trả về note kèm tag (chuẩn hoá dữ liệu)
      const note = await this.prisma.note.findUnique({
        where: { id },
        include: {
          tag: {
            include: {
              tag: {
                select: {
                  name: true,
                  tag_color: true,
                },
              },
            },
          },
        },
      });

      return {
        ...note,
        tag: note?.tag.map((tn) => ({
          tagId: tn.tagId,
          noteId: tn.noteId,
          createdAt: tn.createdAt,
          tagName: tn.tag?.name ?? null,
          tagColor: tn.tag?.tag_color ?? null,
        })),
      };
    } catch (err) {
      this.handleError(err, 'update');
    }
  }

  async remove(id: number) {
    try {
      // 1. Xoá hết tag liên quan trong bảng trung gian
      await this.prisma.tagNote.deleteMany({
        where: { noteId: id },
      });

      // 2. Xoá chính bản thân note
      return await this.prisma.note.delete({
        where: { id },
      });
    } catch (err) {
      this.handleError(err, 'remove');
    }
  }

}
