import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = `${environment.apiUrl}/api/cart`;

  constructor(private http: HttpClient) {}

  getCart(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addToCart(productId: string, quantity: number = 1): Observable<any> {
    return this.http.post(this.apiUrl, { productId, quantity });
  }

  updateCartItem(productId: string, quantity: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/item`, { productId, quantity });
  }

  removeFromCart(productId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/item`, { body: { productId } });
  }

  checkout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/checkout`, {});
  }

  addToCartGuest(productId: string, quantity: number = 1, guestToken: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/guest`, { productId, quantity, guestToken });
  }
}
