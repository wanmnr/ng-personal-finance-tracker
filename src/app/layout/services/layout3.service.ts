// app/layout/services/layout3.service.ts
// Enterprise-Grade Integration with Dynamic Components and Performance Optimizations
import { Injectable, inject } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BehaviorSubject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private readonly breakpointObserver = inject(BreakpointObserver);
  private sidenav?: MatSidenav;

  private readonly isMobileSubject = new BehaviorSubject<boolean>(false);
  isMobile$ = this.isMobileSubject.asObservable();

  sidenavMode$ = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches ? 'over' : 'side'),
      shareReplay()
    );

  contentClass$ = this.breakpointObserver
    .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium])
    .pipe(
      map(result => {
        if (result.breakpoints[Breakpoints.XSmall]) {
          return 'col-span-12';
        }
        if (result.breakpoints[Breakpoints.Small]) {
          return 'col-span-12';
        }
        if (result.breakpoints[Breakpoints.Medium]) {
          return 'col-span-10 col-start-2';
        }
        return 'col-span-8 col-start-3';
      }),
      shareReplay()
    );

  constructor() {
    this.breakpointObserver.observe(Breakpoints.Handset)
      .subscribe(result => this.isMobileSubject.next(result.matches));
  }

  setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }

  isMobile(): boolean {
    return this.isMobileSubject.value;
  }
}
