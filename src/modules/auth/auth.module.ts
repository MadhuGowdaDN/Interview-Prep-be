import { jwtConfig } from '@config/jwt';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '@users/user.module';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    imports: [
        UsersModule,
        JwtModule.register({
            secret: process.env.JWT_ACCESS_SECRET || 'mySecretKey',
            signOptions: { expiresIn: jwtConfig.accessExpiry as any },
        }),
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController,],
})
export class AuthModule { }