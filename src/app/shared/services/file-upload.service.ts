// file-upload.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { FileUploadConfig, FileUploadItem } from '../types/file-upload.types';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private apiUrl = '/api/upload'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) { }

  /**
   * Uploads a file to the server
   * @param file File to upload
   * @returns Observable of upload progress
   */
  uploadFile(item: FileUploadItem): Observable<number> {
    const formData = new FormData();
    formData.append('file', item.file);

    return this.http.post(this.apiUrl, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            return Math.round((event.loaded / (event.total || event.loaded)) * 100);
          case HttpEventType.Response:
            return 100;
          default:
            return 0;
        }
      }),
      catchError(() => of(-1)) // Return -1 to indicate error
    );
  }

  /**
   * Validates a file against the configuration
   * @param file File to validate
   * @param config Upload configuration
   * @returns Validation result
   */
  validateFile(file: File, config: FileUploadConfig): { valid: boolean; error?: string } {
    // Check file size
    if (file.size > config.maxFileSize) {
      return {
        valid: false,
        error: `File size exceeds maximum limit of ${config.maxFileSize / (1024 * 1024)}MB`
      };
    }

    // Check file type
    const fileType = file.type;
    const isAllowedType = config.allowedFileTypes.some(type => {
      if (type.endsWith('/*')) {
        const baseType = type.slice(0, -2);
        return fileType.startsWith(baseType);
      }
      return type === fileType;
    });

    if (!isAllowedType) {
      return {
        valid: false,
        error: 'File type not allowed'
      };
    }

    return { valid: true };
  }
}
