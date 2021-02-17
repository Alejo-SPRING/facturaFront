import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  public getClientes(): Observable<any>{
    return this.http.get("http://localhost:8080/cliente/findAll").pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }
}
