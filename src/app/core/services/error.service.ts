// @core/services/error.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private errorSubject = new Subject<string>();
  errors$ = this.errorSubject.asObservable();

  handleError(error: any): void {
    const message = error.message || 'An unexpected error occurred';
    this.errorSubject.next(message);
  }
}
