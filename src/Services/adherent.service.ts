import { Injectable } from '@angular/core';
import { Adherent } from 'src/Modeles/Adherent';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdherentService {
  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Adherent[]> {
    return this.httpClient.get<Adherent[]>(`http://localhost:3000/adherents`);
  }

  create(adherent: any): Observable<any> {
    return this.httpClient.post(`http://localhost:3000/adherents`, adherent);
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`http://localhost:3000/adherents/${id}`);
  }

  update(id: string, adherent: any): Observable<any> {
    return this.httpClient.put(`http://localhost:3000/adherents/${id}`, adherent);
  }

  getById(id: string): Observable<Adherent> {
    return this.httpClient.get<Adherent>(`http://localhost:3000/adherents/${id}`);
  }
}
