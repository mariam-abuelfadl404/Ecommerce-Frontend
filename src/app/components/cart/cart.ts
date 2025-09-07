import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from '../../services/cart';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartComponent implements OnInit {
  cart: any = { items: [], total: 0, priceChangedItems: [] };
  error: string | null = null;
  guestToken: string = localStorage.getItem('guestToken') || this.generateGuestToken();

  constructor(
    private cartService: CartService,
    public authService: AuthService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    if (this.authService.isLoggedIn) {
      this.cartService.getCart().subscribe({
        next: (response) => {
          this.cart = response.data;
          this.handlePriceChanges();
        },
        error: (err) => {
          this.error = 'Failed to load cart';
          console.error(err);
        }
      });
    } else {
      // Guest mode (stub, to be enhanced with full guest cart logic)
      this.error = 'Please sign in to view cart';
    }
  }

  addToCart(productId: string, quantity: number = 1): void {
    if (this.authService.isLoggedIn) {
      this.cartService.addToCart(productId, quantity).subscribe({
        next: () => this.loadCart(),
        error: (err) => (this.error = 'Failed to add item')
      });
    } else {
      this.cartService.addToCartGuest(productId, quantity, this.guestToken).subscribe({
        next: () => this.loadCart(),
        error: (err) => (this.error = 'Failed to add item as guest')
      });
    }
  }

  updateQuantity(productId: string, quantity: number): void {
    this.cartService.updateCartItem(productId, quantity).subscribe({
      next: () => this.loadCart(),
      error: (err) => (this.error = 'Failed to update quantity')
    });
  }

  removeItem(productId: string): void {
    this.cartService.removeFromCart(productId).subscribe({
      next: () => this.loadCart(),
      error: (err) => (this.error = 'Failed to remove item')
    });
  }

  checkout(): void {
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['/auth/login']);
      return;
    }
    this.cartService.checkout().subscribe({
      next: () => {
        this.cart = { items: [], total: 0, priceChangedItems: [] };
        alert('Checkout successful!');
      },
      error: (err) => (this.error = 'Checkout failed')
    });
  }

  handlePriceChanges(): void {
    if (this.cart.priceChangedItems.length > 0) {
      const decision = confirm('Some items have changed prices. Keep them in cart or remove?');
      if (decision) {
        this.cart.priceChangedItems.forEach((item: any) => {
          this.updateQuantity(item.product._id, item.quantity);
        });
      } else {
        this.cart.priceChangedItems.forEach((item: any) => {
          this.removeItem(item.product._id);
        });
      }
    }
  }

  private generateGuestToken(): string {
    const token = 'guest_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('guestToken', token);
    return token;
  }
}
