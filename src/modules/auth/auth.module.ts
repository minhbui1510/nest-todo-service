import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import {UsersService} from "../users/users.service";
import {CommonModule} from "../../common/common.module";

@Module({
  imports: [
    PassportModule,
      CommonModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'jwt_secret_key',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, JwtStrategy, UsersService],
  controllers: [AuthController],
})
export class AuthModule {}
