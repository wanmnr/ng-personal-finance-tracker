// demo-table-pagination.component.ts

import { Component } from "@angular/core";
import { PaginationComponent } from "@app/shared/components/pagination/pagination.component";
import { PaginationConfig } from "@app/shared/models/pagination.model";

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [PaginationComponent],
  template: `
    <app-pagination
      [config]="paginationConfig"
      (pageChange)="onPageChange($event)"
      (pageSizeChange)="onPageSizeChange($event)">
    </app-pagination>
  `
})
export class DemoDataTableComponent {
  paginationConfig: PaginationConfig = {
    itemsPerPageOptions: [10, 20, 50],
    defaultPageSize: 10,
    maxDisplayedPages: 5
  };

  onPageChange(page: number): void {
    // Handle page change
  }

  onPageSizeChange(pageSize: number): void {
    // Handle page size change
  }
}
