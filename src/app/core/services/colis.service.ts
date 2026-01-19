import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ColisService {
  private apiUrl = `${environment.apiUrl}/colis`;

  constructor(private http: HttpClient) { }

  getColisById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
