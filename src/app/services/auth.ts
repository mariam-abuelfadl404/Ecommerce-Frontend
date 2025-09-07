import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/api/auth`;
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.loadUser();
  }

  loadUser(): void {
    const token = localStorage.getItem('token');
    if (token) {
      // Decode token to get user data (simplified)
      this.currentUserSubject.next({ role: 'user', id: 'decoded_id' }); // Enhance with real decoding
    }
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }
signup(name: string, phone: string, email: string, address: string, password: string): Observable<any> {
  return this.http.post(`${this.apiUrl}/signup`, { name, phone, email, address, password });
}

  logout(): void {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
