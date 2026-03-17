import { Public } from '@common/decorators';
import { cookieConfig } from '@config/cookies';
import { LoginDto, RegisterDto } from '@modules/auth/dto';
import { AuthService } from '@modules/auth/service';
import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    Res
} from '@nestjs/common';
import { UsersService } from '@users/service';
import type { CookieOptions, Request, Response } from 'express';

@Public()
@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService,
    ) { }

    @Post('register')
    async register(@Body() dto: RegisterDto) {
        return this.usersService.createUser(dto);
    }

    @Public()
    @Post('login')
    async login(
        @Body() dto: LoginDto,
        @Res({ passthrough: true }) res: Response,
    ) {

        const user = await this.authService.validateUser(dto.email, dto.password);
        const userId = user._id.toString();
        const accessToken = this.authService.generateAccessToken(
            userId,
            user.role,
        );

        const refreshToken = this.authService.generateRefreshToken(userId);

        res.cookie(
            'accessToken',
            accessToken,
            cookieConfig.accessToken as CookieOptions,
        );

        res.cookie(
            'refreshToken',
            refreshToken,
            cookieConfig.refreshToken as CookieOptions,
        );

        return {
            ok: true,
            error: false,
            message: 'Login successful',
            code: 200,
            data: {
                token: accessToken,
                user: {
                    id: userId,
                    email: user.email,
                    role: user.role,
                },
            },
        };
    }

    @Post('logout')
    async logout(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
    ) {

        const refreshToken = req.cookies?.refreshToken;

        if (refreshToken) {
            await this.authService.logout(refreshToken);
        }

        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');

        return {
            ok: true,
            error: false,
            message: 'Logout successful',
            code: 200
        };
    }

    @Get('status')
    async isUserLoggedIn(@Req() req: Request) {
        const refreshToken = req.cookies?.refreshToken;
        const accessToken = req.cookies?.accessToken;

        const isLoggedIn = !!(refreshToken && accessToken);

        return {
            ok: true,
            error: false,
            isLoggedIn,
            message: isLoggedIn ? 'User is logged in' : 'User is not logged in',
            accessToken: accessToken,
            code: 200
        };
    }
}