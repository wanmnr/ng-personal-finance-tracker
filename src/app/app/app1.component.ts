// @app/app/app1.component.ts
// Approach 1: Basic Layout with Angular Material and Grid System
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule
  ],
  template: `
    <div class="app-container">
      <mat-toolbar color="primary" class="toolbar">
        <span>My Application</span>
      </mat-toolbar>

      <mat-sidenav-container class="sidenav-container">
        <mat-sidenav mode="side" opened>
          <!-- Sidebar content -->
        </mat-sidenav>

        <mat-sidenav-content>
          <mat-grid-list cols="4" rowHeight="100px" gutterSize="16px">
            <mat-grid-tile *ngFor="let item of items">
              <mat-card>
                <mat-card-content>
                  {{item.content}}
                </mat-card-content>
              </mat-card>
            </mat-grid-tile>
          </mat-grid-list>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styles: [`
    .app-container {
      height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .toolbar {
      flex: 0 0 auto;
    }

    .sidenav-container {
      flex: 1 1 auto;
    }
  `]
})
export class AppComponent implements OnInit {
  items = Array.from({ length: 8 }, (_, i) => ({
    content: `Item ${i + 1}`
  }));

  ngOnInit(): void { }
}
