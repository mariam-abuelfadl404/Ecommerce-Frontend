import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../services/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './product.html',
  styleUrls: ['./product.css']
})
export class ProductComponent implements OnInit {
  products: any[] = [];
  totalPages = 0;
  currentPage = 1;
  filterForm: FormGroup;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
    this.filterForm = this.fb.group({
      search: [''],
      category: [''],
      gender: [''],
      minPrice: [''],
      maxPrice: [''],
      inStock: ['true'],
      sort: ['name']
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(page = 1): void {
    const params = { ...this.filterForm.value, page, limit: 10 };
    this.productService.getProducts(params).subscribe({
      next: (response) => {
        this.products = response.data.products;
        this.totalPages = response.data.totalPages;
        this.currentPage = response.data.page;
      },
      error: (err) => (this.error = 'Failed to load products')
    });
  }

  onPageChange(page: number): void {
    if (page > 0 && page <= this.totalPages) this.loadProducts(page);
  }

  viewDetails(id: string): void {
    this.router.navigate([`/products/${id}`]);
  }
}
