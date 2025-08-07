import {
    Body,
    Controller,
    Post,
    UseGuards,
    Get,
} from '@nestjs/common';
import {AuthService} from './auth.service';
import {CreateUserDto} from '../users/dto/create-user.dto';
import {LoginDto} from './dto/login.dto';
import {ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiBody} from '@nestjs/swagger';
import {AuthResponseDto} from './dto/auth-response.dto';
import {JwtAuthGuard} from "./jwt-auth.guard";
import {User} from "../../common/decorator/user.decorator";
import {RefreshTokenDto} from "./dto/refresh-token.dto";
import {Public} from "../../common/decorator/public.decorator";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    /**
     * Đăng ký tài khoản người dùng mới
     */
    @Post('register')
    @ApiOperation({summary: 'Đăng ký tài khoản'})
    @ApiResponse({status: 201, description: 'Đăng ký thành công', type: AuthResponseDto})
    async register(@Body() dto: CreateUserDto) {
        return this.authService.register(dto);
    }

    /**
     * Đăng nhập và nhận access token
     */
    @Post('login')
    @ApiOperation({summary: 'Đăng nhập'})
    @ApiResponse({status: 200, description: 'Đăng nhập thành công', type: AuthResponseDto})
    async login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }

    /**
     * Lấy thông tin user từ token
     */
    @Get('me')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({summary: 'Lấy thông tin tài khoản'})
    @ApiResponse({status: 200, description: 'Thông tin người dùng'})
    async getProfile(@User() user: any) {
        return user;
    }

    @ApiOperation({summary: 'Làm mới accessToken từ refreshToken'})
    @ApiResponse({status: 200, description: 'Token mới trả về', type: RefreshTokenDto})
    @Public()
    @Post('refresh')
    async refresh(@Body() dto: RefreshTokenDto) {
        return this.authService.refresh(dto.refreshToken);
    }

}
