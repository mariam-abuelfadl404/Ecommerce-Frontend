import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth';

export const authInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);

  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next(cloned).pipe(
        catchError(error => {
          if (error.status === 401) {
            authService.logout();
            // Optionally redirect to login (handled in routing later)
          }
          return throwError(() => error);
        })
      );
    }
  }
  return next(req).pipe(
    catchError(error => throwError(() => error))
  );
};
