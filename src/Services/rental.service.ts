import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rental } from 'src/Modeles/Rental';
import { Bicycle } from 'src/Modeles/Bicycle';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  private apiUrl = 'http://localhost:3000/rentals';
  private adherentUrl = 'http://localhost:3000/adherents';
  private bicycleUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  ONSAVE(rentalToSave: any): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/`, rentalToSave);
  }

  ONDELETE(id: string): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/${id}`);
  }

  getRentalById(id: string): Observable<Rental> {
    return this.httpClient.get<Rental>(`${this.apiUrl}/${id}`);
  }

  updateRental(id: string, rent: any): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/${id}`, rent);
  }

  getAll(): Observable<Rental[]> {
    return this.httpClient.get<Rental[]>(this.apiUrl);
  }
/*
  getBicycleById(id: string): Observable<Bicycle> {
    return this.httpClient.get<Bicycle>(`${this.bicycleUrl}/${id}`);
  }

  getAdherentNameById(id: string): Observable<string> {
    return this.httpClient.get<string>(`${this.adherentUrl}/${id}/name`);
  }*/
}
