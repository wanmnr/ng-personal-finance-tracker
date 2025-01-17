// layout/layout1/content-wrapper.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-content-wrapper',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="content-wrapper">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .content-wrapper {
      @apply max-w-7xl mx-auto p-6;
    }
  `]
})
export class ContentWrapperComponent {}
