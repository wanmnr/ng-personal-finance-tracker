// src/app/layout/footer/footer.component.ts
import { Component, Inject, Input } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CopyrightComponent } from './copyright/copyright.component';
import { FooterLinksComponent } from './footer-links/footer-links.component';

interface SocialLink {
  icon: string;
  url: string;
  label: string;
}

interface FooterSection {
  title: string;
  links: Array<{
    label: string;
    url: string;
  }>;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    CopyrightComponent,
    FooterLinksComponent
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  @Input() companyName = 'Your Company';
  @Input() socialLinks: SocialLink[] = [
    { icon: 'facebook', url: '#', label: 'Visit us on Facebook' },
    { icon: 'twitter', url: '#', label: 'Follow us on Twitter' },
    { icon: 'linkedin', url: '#', label: 'Connect with us on LinkedIn' }
  ];

  @Input() footerSections: FooterSection[] = [
    {
      title: 'Company',
      links: [
        { label: 'About Us', url: '/about' },
        { label: 'Careers', url: '/careers' },
        { label: 'Contact', url: '/contact' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', url: '/privacy' },
        { label: 'Terms of Service', url: '/terms' },
        { label: 'Cookie Policy', url: '/cookies' }
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', url: '/help' },
        { label: 'FAQs', url: '/faqs' },
        { label: 'Customer Service', url: '/support' }
      ]
    }
  ];

  constructor(@Inject(DOCUMENT) private document: Document) {}

  scrollToTop(): void {
    this.document.body.scrollTop = 0; // For Safari
    this.document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
}
