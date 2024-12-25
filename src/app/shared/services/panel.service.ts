// services/panel.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { PanelItem } from '@shared/types/panel.interface';
import { environment } from '@env/environment';

/**
 * Service responsible for panel-related API operations
 */
@Injectable({
  providedIn: 'root'
})
export class PanelService {
  private apiUrl = `${environment.apiUrl}/panels`;

  constructor(private http: HttpClient) { }

  /**
   * Fetches all panel items from the API
   * @returns Observable<PanelItem[]>
   */
  getPanels(): Observable<PanelItem[]> {
    return this.http.get<PanelItem[]>(this.apiUrl).pipe(
      catchError(error => throwError(() => new Error(error.message)))
    );
  }

  /**
   * Updates a panel item
   * @param id - Panel ID
   * @param updates - Partial panel updates
   * @returns Observable<PanelItem>
   */
  updatePanel(id: string, updates: Partial<PanelItem>): Observable<PanelItem> {
    return this.http.patch<PanelItem>(`${this.apiUrl}/${id}`, updates).pipe(
      catchError(error => throwError(() => new Error(error.message)))
    );
  }
}
