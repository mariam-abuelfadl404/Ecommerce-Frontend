import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeaderComponent } from '../header/header';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, CommonModule,HeaderComponent,Footer],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements  OnDestroy {
  user: any = null;
  private userSubscription: Subscription | undefined;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  logout(): void {
    if (confirm('Are you sure you want to logout?')) {
      this.authService.logout();
      this.router.navigate(['/auth/login']);
    }
  }
}
