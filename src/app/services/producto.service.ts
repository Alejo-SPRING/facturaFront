import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) { }

  public getProductos(): Observable<any>{
    return this.http.get("http://localhost:8080/producto/findAll").pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }

}
