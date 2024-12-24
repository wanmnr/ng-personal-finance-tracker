// components/file-uploader.component.ts
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUpload, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { FileUploadService } from '@shared/services/file-upload.service';
import { FileUploadConfig, FileUploadItem } from '@shared/types/file-upload.types';
import { FileUploadActions } from '@shared/store/actions/file-upload.actions';
import { FileSizePipe } from '@app/shared/pipes/file-size.pipe';
import { Observable } from 'rxjs/internal/Observable';
import { FileUploadState } from '@app/shared/store/state/file-upload.state';

@Component({
  selector: 'app-file-uploader',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressBarModule,
    FontAwesomeModule,
    FileSizePipe
  ],
  template: `
    <div class="file-uploader-container">
      <mat-card class="upload-card">
        <mat-card-content>
          <div
            class="drop-zone"
            [class.drag-over]="isDragOver"
            (dragover)="onDragOver($event)"
            (dragleave)="onDragLeave($event)"
            (drop)="onDrop($event)"
          >
            <fa-icon [icon]="uploadIcon" size="3x"></fa-icon>
            <p class="upload-text">
              Drag and drop files here or
              <button
                mat-button
                color="primary"
                (click)="fileInput.click()"
              >
                browse
              </button>
            </p>
            <input
              #fileInput
              type="file"
              [multiple]="config.multiple"
              [accept]="config.allowedFileTypes.join(',')"
              (change)="onFileSelected($event)"
              class="hidden"
            >
          </div>

          <div class="file-list" *ngIf="uploads$ | async as uploads">
            <div
              *ngFor="let item of uploads"
              class="file-item"
            >
              <div class="file-info">
                <span class="file-name">{{ item.file.name }}</span>
                <span class="file-size">
                  {{ item.file.size | fileSize }}
                </span>
              </div>

              <mat-progress-bar
                [mode]="item.status === 'uploading' ? 'determinate' : 'determinate'"
                [value]="item.progress"
              ></mat-progress-bar>

              <button
                mat-icon-button
                color="warn"
                (click)="removeFile(item.id)"
              >
                <fa-icon [icon]="trashIcon"></fa-icon>
              </button>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .file-uploader-container {
      @apply w-full max-w-3xl mx-auto p-4;
    }

    .upload-card {
      @apply w-full;
    }

    .drop-zone {
      @apply border-2 border-dashed border-gray-300 rounded-lg p-8
             flex flex-col items-center justify-center
             transition-all duration-200 ease-in-out;

      &.drag-over {
        @apply border-primary-500 bg-primary-50;
      }
    }

    .upload-text {
      @apply mt-4 text-center text-gray-600;
    }

    .file-list {
      @apply mt-6 space-y-4;
    }

    .file-item {
      @apply flex items-center space-x-4 p-4 bg-gray-50 rounded-lg;
    }

    .file-info {
      @apply flex-1;
    }

    .file-name {
      @apply text-sm font-medium;
    }

    .file-size {
      @apply text-xs text-gray-500 ml-2;
    }

    .hidden {
      @apply hidden;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileUploaderComponent {
  @Input() config: FileUploadConfig = {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedFileTypes: ['image/*', 'application/pdf'],
    multiple: true,
    maxFiles: 5
  };

  uploadIcon = faUpload;
  trashIcon = faTrash;
  isDragOver = false;
  uploads$: Observable<FileUploadItem[]>;

  constructor(
    private store: Store<FileUploadState>,
    private fileUploadService: FileUploadService
  ) {
    this.uploads$ = this.store.select(state => state.uploads);
  }



  /**
   * Handles file selection event
   * @param event File input change event
   */
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.processFiles(Array.from(input.files));
    }
  }

  /**
   * Handles drag over event
   * @param event DragEvent
   */
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = true;
  }

  /**
   * Handles drag leave event
   * @param event DragEvent
   */
  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
  }

  /**
   * Handles file drop event
   * @param event DragEvent
   */
  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;

    const files = Array.from(event.dataTransfer?.files ?? []);
    this.processFiles(files);
  }

  /**
   * Processes selected files
   * @param files Array of files to process
   */
  private processFiles(files: File[]): void {
    const validFiles: FileUploadItem[] = files
      .filter(file => {
        const validation = this.fileUploadService.validateFile(file, this.config);
        if (!validation.valid) {
          console.error(validation.error);
        }
        return validation.valid;
      })
      .map(file => ({
        id: crypto.randomUUID(),
        file,
        progress: 0,
        status: 'idle' as const
      }));

    if (validFiles.length) {
      this.store.dispatch(FileUploadActions.uploadFiles({ items: validFiles }));
    }
  }

  /**
   * Removes a file from the upload list
   * @param id File ID to remove
   */
  removeFile(id: string): void {
    this.store.dispatch(FileUploadActions.removeFile({ id }));
  }
}
