import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = `${environment.apiUrl}/api/orders`;

  constructor(private http: HttpClient) {}

  createOrder(shippingAddress: string, paymentMethod: string): Observable<any> {
    return this.http.post(this.apiUrl, { shippingAddress, paymentMethod });
  }

  getOrders(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getOrderById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  requestRefund(orderId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${orderId}/refund`, {}); // Adjust endpoint if needed
  }
}
