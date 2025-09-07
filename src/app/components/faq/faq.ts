import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { FaqService } from '../../services/faq';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, MatExpansionModule],
  templateUrl: './faq.html',
  styleUrls: ['./faq.css']
})
export class FaqComponent implements OnInit {
  faqs: any[] = [];
  error: string | null = null;

  constructor(private faqService: FaqService) {}

  ngOnInit(): void {
    this.loadFAQs();
  }

  loadFAQs(): void {
    this.faqService.getFAQs().subscribe({
      next: (response) => {
        this.faqs = response.data;
      },
      error: (err) => {
        this.error = 'Failed to load FAQs';
        console.error(err);
      }
    });
  }
}
