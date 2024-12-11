// app.component.ts
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';
import { MainComponent } from './layout/layouts/main/main1.component';
import { SpinnerService } from './shared/services/spinner.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MainComponent, NgxSpinnerModule, LoadingSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'ng-personal-finance-tracker';

  constructor(private spinnerService: SpinnerService) { }

  someAsyncOperation() {
    this.spinnerService.show();
    // Your async operation
    // ...
    this.spinnerService.hide();
  }

  ngOnInit() {
    // Optional: Show spinner when app initializes
    // this.spinnerService.show();
    this.loadSomething();
  }

  // Example method to use the spinner
  loadSomething() {
    this.spinnerService.show();
    // Simulating an API call
    setTimeout(() => {
      this.spinnerService.hide();
    }, 2000);
  }
}
