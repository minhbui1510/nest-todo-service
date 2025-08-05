import { Injectable } from '@nestjs/common';
import {BaseService} from "../../common/base/base.service";
import {PrismaService} from "../../common/context/prisma.service";
import {RequestContextService} from "../../common/context/request-context.service";
import {CreateTagDto} from "./dto/create-tag.dto";
import {UpdateTagDto} from "./dto/update-tag.dto";

@Injectable()
export class TagsService extends BaseService {

  constructor(
    private readonly prisma: PrismaService,
    protected readonly context: RequestContextService, // 👈 inject từ Nest container
  ) {
    super(context); // 👈 truyền context vào BaseService
  }
    async findAll() {
        try {
        return await this.prisma.tag.findMany();
        } catch (err) {
        this.handleError(err, 'findAll');
        }
    }
    async findOne(id: number) {
        try {
            return await this.prisma.tag.findUnique({ where: { id } });
        } catch (err) {
            this.handleError(err, 'findOne');
        }
    }
    async create(data: CreateTagDto) {
        try {
            return await this.prisma.tag.create({ data });
        } catch (err) {
            this.handleError(err, 'create');
        }
    }
    async update(id: number, data: UpdateTagDto) {
        try {
            return await this.prisma.tag.update({ where: { id }, data });
        } catch (err) {
            this.handleError(err, 'update');
        }
    }
    async remove(id: number) {
        try {
            return await this.prisma.tag.delete({ where: { id } });
        } catch (err) {
            this.handleError(err, 'remove');
        }
    }
}
