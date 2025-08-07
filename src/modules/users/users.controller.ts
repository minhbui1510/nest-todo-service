import {
  Controller,
  Get,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {User} from "../../common/decorator/user.decorator";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@ApiTags('Users')
@Controller('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Lấy danh sách toàn bộ user (chỉ admin dùng trong thực tế)
   */
  @Get()
  @ApiOperation({ summary: 'Lấy danh sách người dùng' })
  @ApiResponse({ status: 200 })
  async findAll() {
    return this.usersService.findAll();
  }

  /**
   * Lấy thông tin 1 user theo ID
   */
  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin người dùng theo ID' })
  @ApiResponse({ status: 200 })
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findById(Number(id));
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  /**
   * Lấy thông tin người dùng hiện tại (đã xác thực)
   */
  @Get('me')
  @ApiOperation({ summary: 'Lấy thông tin người dùng hiện tại' })
  @ApiResponse({ status: 200 })
  async getMe(@User() user: any) {
    return user;
  }

  /**
   * Xoá user theo ID
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Xoá người dùng theo ID' })
  @ApiResponse({ status: 200 })
  async remove(@Param('id') id: string) {
    return this.usersService.remove(Number(id));
  }
}
