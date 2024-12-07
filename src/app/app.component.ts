import { Component } from '@angular/core';
import { MainComponent } from './layout/main/main1.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ng-personal-finance-tracker';
}
