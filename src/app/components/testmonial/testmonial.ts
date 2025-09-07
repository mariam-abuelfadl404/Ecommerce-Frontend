import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TestimonialService } from '../../services/testmonial';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-testimonial',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './testimonial.html',
  styleUrls: ['./testimonial.css']
})
export class TestimonialComponent implements OnInit {
  testimonials: any[] = [];
  testimonialForm: FormGroup;
  success: boolean = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private testimonialService: TestimonialService,
    public authService: AuthService
  ) {
    this.testimonialForm = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(10)]],
      rating: [1, [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  ngOnInit(): void {
    this.loadTestimonials();
  }

  loadTestimonials(): void {
    this.testimonialService.getTestimonials().subscribe({
      next: (response) => {
        this.testimonials = response.data;
      },
      error: (err) => {
        this.error = 'Failed to load testimonials';
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    if (this.testimonialForm.invalid || !this.authService.isLoggedIn) {
      this.error = this.authService.isLoggedIn ? 'Please fill all fields' : 'Please sign in to submit';
      return;
    }

    const { content, rating } = this.testimonialForm.value;
    this.testimonialService.addTestimonial(content, rating).subscribe({
      next: () => {
        this.success = true;
        this.error = null;
        this.loadTestimonials();
        this.testimonialForm.reset({ rating: 1 });
      },
      error: (err) => {
        this.error = err.error.message || 'Failed to submit testimonial';
        console.error(err);
      }
    });
  }
}
