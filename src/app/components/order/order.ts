import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { OrderService } from '../../services/order';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './order.html',
  styleUrls: ['./order.css']
})
export class OrderComponent implements OnInit {
  orders: any[] = [];
  error: string | null = null;

  constructor(
    private orderService: OrderService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    if (!this.authService.isLoggedIn) return;
    this.orderService.getOrders().subscribe({
      next: (response) => {
        this.orders = response.data;
      },
      error: (err) => {
        this.error = 'Failed to load orders';
        console.error(err);
      }
    });
  }

  getOrderDetails(orderId: string): void {
    this.orderService.getOrderById(orderId).subscribe({
      next: (response) => {
        console.log('Order Details:', response.data); // Enhance with a dialog later
      },
      error: (err) => {
        this.error = 'Failed to load order details';
      }
    });
  }

  isRefundEligible(order: any): boolean {
    return order.isRefundEligible && new Date(order.refundDeadline) > new Date();
  }

  requestRefund(orderId: string): void {
    if (confirm('Are you sure you want to request a refund?')) {
      this.orderService.requestRefund(orderId).subscribe({
        next: () => {
          this.loadOrders(); // Refresh order list
          alert('Refund requested successfully!');
        },
        error: (err) => {
          this.error = 'Failed to request refund';
          console.error(err);
        }
      });
    }
  }
}
