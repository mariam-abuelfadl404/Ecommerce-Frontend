import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn) {
    return true; // Allow access if logged in
  } else {
    router.navigate(['/auth/login']); // Redirect to login if not logged in
    return false; // Block access
  }
};
