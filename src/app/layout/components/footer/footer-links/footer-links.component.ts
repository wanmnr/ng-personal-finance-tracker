// src/app/layout/footer/footer-links/footer-links.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer-links',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer-links.component.html',
  styleUrl: './footer-links.component.scss'
})
export class FooterLinksComponent {
  links = [
    { label: 'Accessibility', url: '/accessibility' },
    { label: 'Sitemap', url: '/sitemap' }
  ];
}
