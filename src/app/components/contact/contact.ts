import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ContactService } from '../../services/contact';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class ContactComponent {
  contactForm: FormGroup;
  success: boolean = false;
  error: string | null = null;

  constructor(private fb: FormBuilder, private contactService: ContactService) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
      category: ['Normal Question', [Validators.required]] // Default category
    });
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.error = 'Please fill all fields correctly';
      return;
    }

    const { name, email, message, category } = this.contactForm.value;
    this.contactService.submitContact(name, email, message, category).subscribe({
      next: () => {
        this.success = true;
        this.error = null;
        this.contactForm.reset({ category: 'Normal Question' });
      },
      error: (err) => {
        this.error = err.error.message || 'Failed to submit contact';
        console.error(err);
      }
    });
  }
}
