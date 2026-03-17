import { IS_PUBLIC_KEY } from '@common/decorators';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        // Check if the route is public
        const isPublic = this.reflector.getAllAndOverride<boolean>(
            IS_PUBLIC_KEY,
            [
                context.getHandler(),
                context.getClass(),
            ],
        );

        // If it's public, allow access without token validation
        if (isPublic) {
            return true;
        }

        // For non-public routes, validate the JWT token
        try {
            // Call the parent canActivate to perform JWT validation
            const canActivate = await super.canActivate(context);

            // If you want to allow requests with OR without token on public routes,
            // you can also check if token exists and validate it optionally
            if (isPublic && canActivate) {
                // Token was provided and is valid, you can access user info if needed
                return true;
            }

            return canActivate as boolean;
        } catch (error) {
            // If it's a public route, allow access even if token validation fails
            if (isPublic) {
                return true;
            }
            throw error;
        }
    }
}