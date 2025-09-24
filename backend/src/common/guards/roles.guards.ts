import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../decorators/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private reflector: Reflector) {}
    
    canActivate(context: ExecutionContext): boolean {
        // Récupère les rôles attendus depuis les métadonnées
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true; // Si aucun rôle n'est requis, autoriser l'accès
        }
        const { user } = context.switchToHttp().getRequest();
        return requiredRoles.includes(user?.role);
    }
}