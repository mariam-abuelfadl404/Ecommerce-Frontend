import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {
  private apiUrl = `${environment.apiUrl}/api/testimonials`;

  constructor(private http: HttpClient) {}

  getTestimonials(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addTestimonial(content: string, rating: number): Observable<any> {
    return this.http.post(this.apiUrl, { content, rating });
  }
}
