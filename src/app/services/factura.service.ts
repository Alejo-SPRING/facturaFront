import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  constructor(private http: HttpClient) { }

  public crearFactura(body: any) : Observable<any>{
    return this.http.post("http://localhost:8080/factura/crearFactura", body).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }
}
