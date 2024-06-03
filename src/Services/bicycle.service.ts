import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bicycle } from 'src/Modeles/Bicycle';
import { BicycleType } from 'src/Modeles/BicycleType';

@Injectable({
  providedIn: 'root'
})

export class BicycleService {
  private apiUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  // CRUD operations for bicycles
  getAllBicycles(): Observable<Bicycle[]> {
    return this.httpClient.get<Bicycle[]>(`${this.apiUrl}/bicycles`);
  }

  createBicycle(bicycle: Bicycle): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/bicycles`, bicycle);
  }

  deleteBicycle(id: string): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/bicycles/${id}`);
  }

  updateBicycle(id: string, bicycle: Bicycle): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/bicycles/${id}`, bicycle);
  }

  getBicycleById(id: string): Observable<Bicycle> {
    return this.httpClient.get<Bicycle>(`${this.apiUrl}/bicycles/${id}`);
  }

  // CRUD operations for bicycle types
  getAllBicycleTypes(): Observable<BicycleType[]> {
    return this.httpClient.get<BicycleType[]>(`${this.apiUrl}/types`);
  }

  createBicycleType(bicycleType: BicycleType): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/types`, bicycleType);
  }

  deleteBicycleType(id: string): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/types/${id}`);
  }

  updateBicycleType(id: string, bicycleType: BicycleType): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/types/${id}`, bicycleType);
  }

  getBicycleTypeById(id: string): Observable<BicycleType> {
    return this.httpClient.get<BicycleType>(`${this.apiUrl}/types/${id}`);
  }
}
