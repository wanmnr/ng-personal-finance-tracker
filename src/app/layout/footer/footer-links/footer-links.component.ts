/**
 * @file footer-links.component.ts
 * @module app/layout/footer/footer-links
 *
 * @description Provides utility navigation links for accessibility and site navigation
 *
 * @remarks
 * A supplementary navigation component that contains essential utility links
 * typically placed at the bottom of the footer. These links provide access
 * to site-wide resources and compliance-related pages.
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer-links',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer-links.component.html',
  styleUrl: './footer-links.component.scss',
})
export class FooterLinksComponent {
  links = [
    { label: 'Accessibility', url: '/accessibility' },
    { label: 'Sitemap', url: '/sitemap' },
  ];
}
