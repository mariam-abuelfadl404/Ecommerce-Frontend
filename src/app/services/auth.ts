import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject = new BehaviorSubject<any>(null);
  public user$ = this.userSubject.asObservable();
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) this.setUser(token);
    }
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response: any) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', response.token);
        }
        this.setUser(response.token);
      })
    );
  }

  signup(name: string, phone: string, email: string, address: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, { name, phone, email, address, password });
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    this.userSubject.next(null);
  }

  private setUser(token: string): void {
    const decoded = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
    this.userSubject.next({ id: decoded.id, role: decoded.role || 'user' });
  }

  get isLoggedIn(): boolean {
    return typeof window !== 'undefined' && !!localStorage.getItem('token');
  }

  get userRole(): string {
    return this.userSubject.value?.role || 'user';
  }
}
