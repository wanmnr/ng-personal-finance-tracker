/**
 * @file copyright.component.ts
 * @module app/layout/footer/copyright
 *
 * @description Displays dynamic copyright information with the current year
 *
 * @remarks
 * A simple component that automatically updates the copyright year.
 * Typically used within the footer to display standard copyright text.
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-copyright',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './copyright.component.html',
  styleUrl: './copyright.component.scss',
})
export class CopyrightComponent {
  currentYear = new Date().getFullYear();
  companyName = 'Your Company';
}
