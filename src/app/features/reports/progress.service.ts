// features/report/progress.service.ts

import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { ReportProgress } from "./report.resolver";

// Progress Service
export class ProgressService {
  private progressSubject = new BehaviorSubject<ReportProgress | null>(null);
  progress$ = this.progressSubject.asObservable();

  start() {
    this.progressSubject.next({ stage: 'processing', progress: 0 });
  }

  updateProgress(progress: ReportProgress) {
    this.progressSubject.next(progress);
  }

  error(error: any) {
    // Handle error state
    this.progressSubject.next(null);
  }

  complete() {
    this.progressSubject.next(null);
  }
}
