import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = `${environment.apiUrl}/api/contact`;

  constructor(private http: HttpClient) {}

  submitContact(name: string, email: string, message: string, category: string): Observable<any> {
    return this.http.post(this.apiUrl, { name, email, message, category });
  }
}
