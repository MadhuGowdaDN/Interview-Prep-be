import { jwtConfig } from '@config/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '@users/repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(email: string, password: string) {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new UnauthorizedException('Invalid email or password');
        }

        if (!user.isActive) {
            throw new UnauthorizedException('User account is inactive');
        }

        return user;
    }

    generateAccessToken(userId: string, role: string) {
        return this.jwtService.sign(
            { sub: userId, role },
            {
                secret: jwtConfig.accessSecret as any,
                expiresIn: jwtConfig.accessExpiry as any,
            },
        );
    }

    generateRefreshToken(userId: string) {
        return this.jwtService.sign(
            { sub: userId },
            {
                secret: jwtConfig.refreshSecret as any,
                expiresIn: jwtConfig.refreshExpiry as any,
            },
        );
    }

    async logout(refreshToken: string) {
        const decoded = this.jwtService.verify(refreshToken);

        await this.usersRepository.removeRefreshToken(decoded.sub);
    }
}