import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string = 'http://localhost:3000'; // URL del backend

  constructor(private http: HttpClient) {}

  // Ejemplo de un método para obtener datos
  getData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/ruta`);
  }

  // Otro método para enviar datos (ejemplo de POST)
  postData(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/ruta`, data);
  }
}
