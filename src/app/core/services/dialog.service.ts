/**
 * @file dialog.service.ts
 * @module Core/Services/Dialog
 * @description Angular Material dialog wrapper service for consistent dialog management
 *
 * @remarks
 * Provides centralized dialog handling with:
 * - Typed dialog responses
 * - Standardized confirmation dialogs
 * - Custom dialog configuration
 *
 * @example
 * ```typescript
 * constructor(private dialogService: DialogService) {}
 *
 * // Using confirmation dialog
 * async confirmDelete(): Promise<void> {
 *   const confirmed = await this.dialogService
 *     .confirm('Delete this item?')
 *     .toPromise();
 *
 *   if (confirmed) {
 *     // Handle confirmation
 *   }
 * }
 *
 * // Using custom dialog
 * openCustomDialog(): void {
 *   this.dialogService
 *     .openDialog<CustomData, CustomResult>(CustomComponent, {
 *       data: { prop: 'value' },
 *       width: '500px'
 *     })
 *     .subscribe(result => {
 *       // Handle dialog result
 *     });
 * }
 * ```
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
   * Opens a confirmation dialog
   * @param message - Dialog content message
   * @param title - Optional dialog title
   * @returns Observable resolving to user's confirmation choice
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
   * Opens a custom dialog component
   *
   * @typeParam T - Type of data passed to dialog
   * @typeParam R - Type of data returned from dialog
   * @param component - Component to render in dialog
   * @param config - Dialog configuration options
   * @returns Observable of dialog result
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
