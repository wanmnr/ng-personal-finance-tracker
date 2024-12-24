import { createReducer, on } from '@ngrx/store';
import { FileUploadActions } from '../actions/file-upload.actions';
import { FileUploadItem } from '@shared/types/file-upload.types';

export interface FileUploadState {
  uploads: FileUploadItem[];
}

export const initialState: FileUploadState = {
  uploads: []
};

export const fileUploadReducer = createReducer(
  initialState,

  on(FileUploadActions.addFiles, (state, { files }) => ({
    ...state,
    uploads: [
      ...state.uploads,
      ...files.map(file => ({
        id: crypto.randomUUID(),
        file,
        progress: 0,
        status: 'idle' as const
      }))
    ]
  })),

  on(FileUploadActions.uploadSuccess, (state, { id }) => ({
    ...state,
    uploads: state.uploads.map(item =>
      item.id === id
        ? { ...item, status: 'success' as const, progress: 100 }
        : item
    )
  })),

  on(FileUploadActions.uploadError, (state, { id, error }) => ({
    ...state,
    uploads: state.uploads.map(item =>
      item.id === id
        ? { ...item, status: 'error' as const, errorMessage: error }
        : item
    )
  })),

  on(FileUploadActions.updateProgress, (state, { id, progress }) => ({
    ...state,
    uploads: state.uploads.map(item =>
      item.id === id
        ? { ...item, progress, status: 'uploading' as const }
        : item
    )
  })),

  on(FileUploadActions.removeFile, (state, { id }) => ({
    ...state,
    uploads: state.uploads.filter(item => item.id !== id)
  })),

  on(FileUploadActions.clearAll, () => initialState)
);
