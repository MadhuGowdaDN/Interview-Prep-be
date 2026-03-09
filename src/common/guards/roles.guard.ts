import {
    CanActivate,
    ExecutionContext,
    Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {

        const roles = this.reflector.get<string[]>(
            'roles',
            context.getHandler(),
        );
        console.log("roles ", roles)
        if (!roles) return true;

        const request = context.switchToHttp().getRequest();
        console.log("request ", request)

        const user = request.user;
        console.log("user ", user)

        return roles.includes(user.role);
    }
}