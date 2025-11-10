import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { InventoryItem, InventoryRequestPayload } from '../types/inventory.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBaseUrl}/inventory`;

  list(): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(this.baseUrl);
  }

  create(payload: InventoryRequestPayload): Observable<InventoryItem> {
    return this.http.post<InventoryItem>(this.baseUrl, payload);
  }

  update(id: string, payload: InventoryRequestPayload): Observable<InventoryItem> {
    return this.http.put<InventoryItem>(`${this.baseUrl}/${id}`, payload);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

