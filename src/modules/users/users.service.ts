import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import {PrismaService} from "../../common/context/prisma.service";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  /** Tạo user mới và hash password */
  async create(createUserDto: CreateUserDto) {
    const { email, password, name } = createUserDto;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Lưu user
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    // Ẩn password trước khi trả về
    const { password: _, ...result } = user;
    return result;
  }

  /** Tìm user bằng email (phục vụ login) */
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  /** Tìm user theo id (dùng trong JwtStrategy) */
  async findById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) throw new NotFoundException('User not found');

    const { password, ...rest } = user;
    return rest;
  }

  /** Danh sách user (ẩn password) */
  async findAll() {
    const users = await this.prisma.user.findMany();
    return users.map(({ password, ...rest }) => rest);
  }

  /** Xoá user */
  async remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
