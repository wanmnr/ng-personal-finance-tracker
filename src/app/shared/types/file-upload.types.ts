// types/file-upload.types.ts

/**
 * Represents the status of a file upload
 */
export type FileUploadStatus = 'idle' | 'uploading' | 'success' | 'error';

/**
 * Interface representing a file upload item
 */
export interface FileUploadItem {
  id: string;
  file: File;
  progress: number;
  status: FileUploadStatus;
  errorMessage?: string;
}

/**
 * Interface for file upload configuration
 */
export interface FileUploadConfig {
  maxFileSize: number;
  allowedFileTypes: string[];
  multiple: boolean;
  maxFiles?: number;
}
