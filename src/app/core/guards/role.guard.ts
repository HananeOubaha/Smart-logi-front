import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Garde pour protéger les routes en fonction du rôle de l'utilisateur.
 * Utilisation : canActivate: [roleGuard], data: { expectedRole: 'ROLE_MANAGER' }
 */
export const roleGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const expectedRole = route.data['expectedRole'];
    const userRole = authService.getUserRole();

    if (authService.isLoggedIn() && userRole === expectedRole) {
        return true;
    }

    // Si l'utilisateur n'a pas le bon rôle, rediriger vers le dashboard par défaut
    // ou une page d'accès refusé
    alert("Accès refusé ! Vous n'avez pas les permissions nécessaires.");
    router.navigate(['/dashboard']);
    return false;
};
