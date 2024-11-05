import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environments.prod';
import { Observable, map } from 'rxjs';
import { Factura } from '../models/factura';
import { Personal } from '../models/personal';
import { Detalle } from '../models/detalle';
import { Producto } from '../models/producto';
import { response } from 'express';

@Injectable({
  providedIn: 'root',
})
export class FacturaService {
  constructor(private http: HttpClient) {}

  base = environment.base;
  listar(): Observable<any[]> {
    return this.http.get<any[]>(this.base + 'factura');
  }
  eliminar(id: number): Observable<Factura[]> {
    return this.http.delete<Factura[]>(this.base + 'factura/' + id);
  }
  agregar(formulario: Factura): Observable<number> {
    return this.http.post<any>(this.base + 'factura/', formulario).pipe(
      map((response) => {
        return response.id;
      })
    ); // con este cambio, al momento de agregar una factura nos devuelve el id y lo trasforema a una solo caracter,de lo que era un objeto con el caracter
  }
  actualizar(formulario: Factura, id: number): Observable<Factura[]> {
    return this.http.put<Factura[]>(this.base + 'factura/' + id, formulario);
  }
  detallar(id: number): Observable<any[]> {
    return this.http.get<any[]>(this.base + 'factura/detallar/' + id);
  }
  reporte(
    dia1: any,
    mes1: any,
    gestion1: any,
    dia2: any,
    mes2: any,
    gestion2: any
  ): Observable<any[]> {
    return this.http.get<any[]>(
      this.base +
        'factura/reporte/' +
        dia1 +
        '/' +
        mes1 +
        '/' +
        gestion1 +
        '/' +
        dia2 +
        '/' +
        mes2 +
        '/' +
        gestion2
    );
  }

  ventasporusuario(
    dia1: any,
    mes1: any,
    gestion1: any,
    dia2: any,
    mes2: any,
    gestion2: any,
    ci: any
  ): Observable<any[]> {
    return this.http.get<any[]>(
      this.base +
        'factura/ventasporusuario/' +
        dia1 +
        '/' +
        mes1 +
        '/' +
        gestion1 +
        '/' +
        dia2 +
        '/' +
        mes2 +
        '/' +
        gestion2 +
        '/' +
        ci
    );
  }

  reporteingresos(
    dia1: any,
    mes1: any,
    gestion1: any,
    dia2: any,
    mes2: any,
    gestion2: any
  ): Observable<any[]> {
    return this.http.get<any[]>(
      this.base +
        'factura/reportedeingresos/' +
        dia1 +
        '/' +
        mes1 +
        '/' +
        gestion1 +
        '/' +
        dia2 +
        '/' +
        mes2 +
        '/' +
        gestion2
    );
  }

  reporteeconomicogeneral(
    dia1: any,
    mes1: any,
    gestion1: any,
    dia2: any,
    mes2: any,
    gestion2: any
  ): Observable<any[]> {
    return this.http.get<any[]>(
      this.base +
        'factura/reporteeconomicogeneral/' +
        dia1 +
        '/' +
        mes1 +
        '/' +
        gestion1 +
        '/' +
        dia2 +
        '/' +
        mes2 +
        '/' +
        gestion2
    );
  }
}
