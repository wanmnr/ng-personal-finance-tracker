// progress.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Progress {
  stage: string;
  progress: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProgressService {
  private progressSubject = new BehaviorSubject<Progress>({
    stage: 'Initial',
    progress: 0,
  });

  progress$ = this.progressSubject.asObservable();

  updateProgress(progress: Progress) {
    this.progressSubject.next(progress);
  }
}
