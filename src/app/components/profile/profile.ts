import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from '../../services/profile';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  success: boolean = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    public authService: AuthService
  ) {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern(/^(?:\+?201|01)[0125][0-9]{8}$/)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  ngOnInit(): void {
    if (this.authService.currentUser) {
      this.profileForm.patchValue(this.authService.currentUser);
    }
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      this.error = 'Please fill all fields correctly';
      return;
    }

    this.profileService.updateProfile(this.profileForm.value).subscribe({
      next: (response) => {
        this.success = true;
        this.error = null;
        this.authService.loadUser(); // Update current user
      },
      error: (err) => {
        this.error = err.error.message || 'Failed to update profile';
        console.error(err);
      }
    });
  }
}
