// store/file-upload.actions.ts

import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { FileUploadItem } from '../../types/file-upload.types';

export const FileUploadActions = createActionGroup({
  source: 'File Upload',
  events: {
    'Add Files': props<{ files: File[] }>(),
    'Upload Files': props<{ items: FileUploadItem[] }>(),
    'Upload Success': props<{ id: string }>(),
    'Upload Error': props<{ id: string, error: string }>(),
    'Update Progress': props<{ id: string, progress: number }>(),
    'Remove File': props<{ id: string }>(),
    'Clear All': emptyProps()
  }
});

