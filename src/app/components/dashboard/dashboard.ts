import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DashboardService } from '../../services/dashboard';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stats: any = {};
  report: any[] = [];
  error: string | null = null;
  filterForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dashboardService: DashboardService,
    public authService: AuthService
  ) {
    this.filterForm = this.fb.group({
      from: [''],
      to: ['']
    });
  }

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    if (this.authService.isLoggedIn && this.authService.currentUser.role !== 'admin') {
      this.error = 'Access denied';
      return;
    }
    this.dashboardService.getDashboardStats().subscribe({
      next: (response) => this.stats = response.data,
      error: (err) => (this.error = 'Failed to load stats')
    });
    this.dashboardService.getProductsSoldReport().subscribe({
      next: (response) => this.report = response.data,
      error: (err) => (this.error = 'Failed to load report')
    });
  }

  applyFilters(): void {
    const { from, to } = this.filterForm.value;
    this.dashboardService.getDashboardStats(from, to).subscribe({
      next: (response) => this.stats = response.data,
      error: (err) => (this.error = 'Failed to load filtered stats')
    });
    this.dashboardService.getProductsSoldReport(from, to).subscribe({
      next: (response) => this.report = response.data,
      error: (err) => (this.error = 'Failed to load filtered report')
    });
  }
}
