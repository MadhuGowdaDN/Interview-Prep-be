import { jwtConfig } from '@config/jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor() {
        console.log("jwtConfig ", jwtConfig)
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req) => req?.cookies?.accessToken,
            ]),
            secretOrKey: jwtConfig.accessSecret,
        });
    }

    async validate(payload: any) {
        return {
            userId: payload.sub,
            role: payload.role,
        };
    }
}