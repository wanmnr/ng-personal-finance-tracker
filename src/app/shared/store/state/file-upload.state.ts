// store/file-upload.state.ts

import { FileUploadItem } from '@shared/types/file-upload.types';

export interface FileUploadState {
  uploads: FileUploadItem[];
  loading: boolean;
  error: string | null;
}

export const initialFileUploadState: FileUploadState = {
  uploads: [],
  loading: false,
  error: null
};
