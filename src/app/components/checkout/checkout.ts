import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { OrderService } from '../../services/order';
import { CartService } from '../../services/cart';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css']
})
export class CheckoutComponent {
  checkoutForm: FormGroup;
  error: string | null = null;
  success: boolean = false;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private cartService: CartService,
    public authService: AuthService,
    private router: Router // Fixed syntax: 'private' instead of 'p'
  ) {
    this.checkoutForm = this.fb.group({
      shippingAddress: ['', [Validators.required, Validators.minLength(5)]],
      paymentMethod: ['on_receive'] // Default to on_receive per requirement 9
    });
  }

  onSubmit(): void {
    if (this.checkoutForm.invalid || !this.authService.isLoggedIn) {
      this.error = this.authService.isLoggedIn ? 'Please fill all fields' : 'Please sign in to checkout';
      if (!this.authService.isLoggedIn) this.router.navigate(['/auth/login']);
      return;
    }

    const { shippingAddress, paymentMethod } = this.checkoutForm.value;
    this.orderService.createOrder(shippingAddress, paymentMethod).subscribe({
      next: (response) => {
        this.success = true;
        this.error = null;
        alert(`Order placed successfully! Order ID: ${response.data._id}`);
        this.cartService.getCart().subscribe(); // Refresh cart state
        this.checkoutForm.reset({ paymentMethod: 'on_receive' });
      },
      error: (err) => {
        this.error = err.error.message || 'Failed to place order';
        console.error(err);
      }
    });
  }
}
