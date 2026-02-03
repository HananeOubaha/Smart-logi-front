import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Garde d'authentification pour protéger les routes contre les utilisateurs non connectés.
 */
export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.isLoggedIn()) {
        return true;
    }

    // Rediriger vers la page de login si non connecté
    router.navigate(['/login']);
    return false;
};
