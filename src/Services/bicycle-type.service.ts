import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BicycleType } from 'src/Modeles/BicycleType';
@Injectable({
  providedIn: 'root'
})
export class BicycleTypeService {
  constructor(private httpClient: HttpClient) {}

    getAll(): Observable<BicycleType[]> {
      return this.httpClient.get<BicycleType[]>(`http://localhost:3000/types`);
    }
  
    create(type: any): Observable<any> {
      return this.httpClient.post(`http://localhost:3000/types`, type);
    }
  
    delete(id: string): Observable<any> {
      return this.httpClient.delete(`http://localhost:3000/types/${id}`);
    }
  
    update(id: string, type: any): Observable<any> {
      return this.httpClient.put(`http://localhost:3000/types/${id}`, type);
    }
  
    getById(id: string): Observable<BicycleType> {
      return this.httpClient.get<BicycleType>(`http://localhost:3000/types/${id}`);
    }
  }
  