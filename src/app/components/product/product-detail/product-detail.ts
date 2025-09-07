import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product';
import { CartService } from '../../../services/cart';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.css']
})
export class ProductDetailComponent implements OnInit {
  product: any;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.loadProduct(id);
  }

  loadProduct(id: string): void {
    this.productService.getProductById(id).subscribe({
      next: (response) => this.product = response.data,
      error: (err) => (this.error = 'Failed to load product')
    });
  }

  addToCart(): void {
    if (!this.authService.isLoggedIn) {
      this.error = 'Please log in to add to cart';
      return;
    }
    this.cartService.addToCart(this.product._id).subscribe({
      next: () => (this.error = null),
      error: (err) => (this.error = 'Failed to add to cart')
    });
  }
}
