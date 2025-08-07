import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(dto: CreateUserDto) {
    const user = await this.usersService.create(dto);
    const tokens = await this.generateTokens(user.id);
    const { password, ...safeUser } = user as any ;
    return { ...tokens, user: safeUser };
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Tài khoản không tồn tại');
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Sai mật khẩu');
    }

    const tokens = await this.generateTokens(user.id);
    const { password, ...safeUser } = user;
    return { ...tokens, user: safeUser };
  }

  async refresh(refreshToken: string) {
    try {
      const payload = jwt.verify(
        refreshToken,
        process.env.REFRESH_SECRET || 'refresh_secret_key',
      );
      const userId = payload['sub'];

      // 👉 Nếu bạn lưu refreshToken trong DB, kiểm tra tại đây

      const tokens = await this.generateTokens(Number(userId));
      return tokens;
    } catch (err) {
      throw new UnauthorizedException(
        'Refresh token không hợp lệ hoặc đã hết hạn',
      );
    }
  }

  private async generateTokens(userId: number) {
    const accessToken = await this.jwtService.signAsync(
      { sub: userId },
      {
        secret: process.env.JWT_SECRET || 'access_secret_key',
        expiresIn: '15m',
      },
    );

    const refreshToken = jwt.sign(
      { sub: userId },
      process.env.REFRESH_SECRET || 'refresh_secret_key',
      { expiresIn: '7d' },
    );

    return {
      accessToken,
      refreshToken,
    };
  }
}
