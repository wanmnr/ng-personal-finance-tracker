// features/dashboard/card2-demo.component.ts

import { Component } from '@angular/core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { CustomCardComponent } from './custom-card2.component';
import { CardConfig } from './models/card-config.interface';
import { CardService } from './services/card.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CustomCardComponent],
  template: `
    <app-custom-card
      [title]="cardConfig.title"
      [subtitle]="cardConfig.subtitle"
      [actions]="cardConfig.actions"
      [containerClass]="cardConfig.containerClass"
      (cardClick)="handleCardClick()">
      <p>Card content goes here</p>
    </app-custom-card>
  `
})
export class Card2DemoComponent {
  editIcon = faEdit;

  cardConfig: CardConfig = {
    title: 'Dashboard Card',
    subtitle: 'Card Subtitle',
    containerClass: 'bg-white dark:bg-gray-800',
    actions: [
      {
        id: 'edit-action',
        label: 'Edit',
        icon: this.editIcon,
        handler: () => this.handleEdit(),
        ariaLabel: 'Edit card'
      }
    ]
  };

  constructor(private cardService: CardService) { }

  handleCardClick(): void {
    // Handle card click
  }

  handleEdit(): void {
    // Handle edit action
  }
}
