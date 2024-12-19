// demo-modal.component.ts

import { Component } from '@angular/core';
import { ModalService } from '@shared/services/modal.service';
import { ModalComponent } from "@shared/components/modal/modal.component";

@Component({
  selector: 'app-demo-modal',
  standalone: true,
  imports: [ModalComponent],
  template: `
    <button mat-raised-button (click)="openModal()">Open Modal</button>
    <app-modal>
      <div modal-footer>
        <button mat-button (click)="closeModal()">Cancel</button>
        <button mat-raised-button color="primary">Confirm</button>
      </div>
    </app-modal>
  `,
})
export class DemoModalComponent {
  constructor(private modalService: ModalService) { }

  openModal(): void {
    this.modalService.open({
      title: 'Example Modal',
      content: 'This is an example modal content.',
      size: 'md',
      disableClose: false
    });
  }

  closeModal(): void {
    this.modalService.close();
  }
}
