import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';

// Guard to check if the user is the owner of the resource or has admin role

@Injectable()
export class OwnershipGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const resourceOwnerId = request.params.id; // Assuming the resource ID is in the route parameters

    // Allow access if the user is an admin
    if (user.role === 'ADMIN') {
      return true;
    }

    if (user.sub === resourceOwnerId) {
      return true;
    }

    throw new ForbiddenException('Access denied: You do not own this resource.');
  }

}
