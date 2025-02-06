/**
 * @file dialog.service.ts
 * @description Service that handles dialog/confirmation operations across the application
 * @module Services
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/comfirm-dialog.coponent';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  /**
   * Opens a confirmation dialog with the specified message
   * @param message - The message to display in the confirmation dialog
   * @param title - Optional title for the dialog (defaults to 'Confirm')
   * @returns Observable<boolean> - True if confirmed, False if cancelled
   */
  confirm(message: string, title: string = 'Confirm'): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { title, message },
      disableClose: true,
      autoFocus: false,
    });

    return dialogRef.afterClosed();
  }

  /**
   * Opens a custom dialog with specified configuration
   * @param component - The component to be rendered in the dialog
   * @param config - Optional configuration for the dialog
   * @returns Observable<any> - The result from the dialog after it's closed
   */
  openDialog<T, R = any>(
    component: any,
    config: {
      data?: T;
      width?: string;
      height?: string;
      disableClose?: boolean;
    } = {}
  ): Observable<R> {
    const dialogRef = this.dialog.open(component, {
      width: config.width || '400px',
      height: config.height,
      data: config.data,
      disableClose: config.disableClose || false,
      autoFocus: false,
    });

    return dialogRef.afterClosed();
  }
}
