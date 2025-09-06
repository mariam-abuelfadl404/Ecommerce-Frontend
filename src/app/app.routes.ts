import { Routes } from '@angular/router';
import { AuthModule } from './modules/auth'; // Import the module

export const routes: Routes = [
  { path: 'auth', children: AuthModule['routes'] }, // Use the module's routes
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/auth/login' } // Wildcard for 404
];
