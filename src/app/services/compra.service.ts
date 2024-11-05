import { Injectable } from '@angular/core';
import { environment } from '../environments/environments.prod';
import { Observable, map } from 'rxjs';
import { Compra } from '../models/compra';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
@Injectable({
  providedIn: 'root',
})
export class CompraService {
  constructor(private http: HttpClient) {}

  base = environment.base;
  listar(): Observable<Compra[]> {
    return this.http.get<Compra[]>(this.base + 'adquiere');
  }
  eliminar(id: number): Observable<Compra[]> {
    return this.http.delete<Compra[]>(this.base + 'adquiere/' + id);
  }
  agregar(formulario: Compra): Observable<number> {
    return this.http.post<any>(this.base + 'adquiere/', formulario).pipe(
      map((response) => {
        return response.id;
      })
    ); // con este cambio, al momento de agregar una adquiere nos devuelve el id y lo trasforema a una solo caracter,de lo que era un objeto con el caracter
  }
  actualizar(formulario: Compra, id: number): Observable<Compra[]> {
    return this.http.put<Compra[]>(this.base + 'adquiere/' + id, formulario);
  }
  detallar(id: number): Observable<any[]> {
    return this.http.get<any[]>(this.base + 'adquiere/detallar/' + id);
  }

  detallarpdf(id: number): Observable<any[]> {
    return this.http.get<any[]>(this.base + 'adquiere/detallarpdf/' + id);
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
        'adquiere/reporte/' +
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
  reporteegresos(
    dia1: any,
    mes1: any,
    gestion1: any,
    dia2: any,
    mes2: any,
    gestion2: any
  ): Observable<any[]> {
    return this.http.get<any[]>(
      this.base +
        'adquiere/reportedeegresos/' +
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
