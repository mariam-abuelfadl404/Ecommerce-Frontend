import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = `${environment.apiUrl}/api/dashboard`;

  constructor(private http: HttpClient) {}

  getDashboardStats(from?: string, to?: string): Observable<any> {
    const params: { [key: string]: string } = {};
    if (from) params['from'] = from;
    if (to) params['to'] = to;
    return this.http.get(this.apiUrl, { params });
  }

  getProductsSoldReport(from?: string, to?: string): Observable<any> {
    const params: { [key: string]: string } = {};
    if (from) params['from'] = from;
    if (to) params['to'] = to;
    return this.http.get(`${this.apiUrl}/products-sold`, { params });
  }
}
