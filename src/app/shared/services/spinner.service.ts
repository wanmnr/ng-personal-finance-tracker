// services/spinner.service.ts
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  constructor(private spinner: NgxSpinnerService) { }

  show(name = 'primary') {
    this.spinner.show(name);
  }

  hide(name = 'primary') {
    this.spinner.hide(name);
  }
}
