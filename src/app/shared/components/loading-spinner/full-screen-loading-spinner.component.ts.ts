// shared/components/loading-spinner/full-screen-loading-spinner.component.ts

import { Component } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [NgxSpinnerModule],
  template: `
    <ngx-spinner
      bdColor="rgba(51,51,51,0.8)"
      size="large"
      color="#fff"
      type="ball-spin-clockwise"
      [fullScreen]="true">
      <div class="loading-text">
        <p style="color: white">Processing...</p>
        <p style="color: white; font-size: 0.8em">Please wait</p>
      </div>
    </ngx-spinner>
  `,
  styles: [`
  .loading-text {
      position: relative;
      top: 60px;
      text-align: center;
    }

    ::ng-deep .spinner-container {
      z-index: 9999;
    }

    ::ng-deep .ball-spin-clockwise > div {
      background-color: #fff;
      width: 15px;
      height: 15px;
      border-radius: 100%;
      margin: 2px;
      animation-fill-mode: both;
      position: absolute;
    }
  `]
})
export class FullScreenLoadingSpinnerComponent { }
