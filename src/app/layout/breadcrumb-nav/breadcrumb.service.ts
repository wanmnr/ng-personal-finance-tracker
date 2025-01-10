// core/services/breadcrumb.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Breadcrumb } from './breadcrumb.interface';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private breadcrumbs = new BehaviorSubject<Breadcrumb[]>([]);
  breadcrumbs$ = this.breadcrumbs.asObservable();

  setBreadcrumbs(breadcrumbs: Breadcrumb[]): void {
    this.breadcrumbs.next(breadcrumbs);
  }
}
