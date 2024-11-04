import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environments.prod';
import { Producto } from '../models/producto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  constructor(private http: HttpClient) {}

  base = environment.base;

  listar(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.base + 'producto');
  }
  mostrar(id: number): Observable<Producto> {
    return this.http.get<Producto>(this.base + 'producto/' + id);
  }
  eliminar(id: number): Observable<Producto[]> {
    return this.http.delete<Producto[]>(this.base + 'producto/' + id);
  }
  agregar(formulario: Producto): Observable<Producto[]> {
    return this.http.post<Producto[]>(this.base + 'producto/', formulario);
  }
  actualizar(formulario: Producto, id: number): Observable<Producto[]> {
    return this.http.put<Producto[]>(this.base + 'producto/' + id, formulario);
  }
  subirimagen(file: File, nombre: string): Observable<any> {
    const fd = new FormData();
    fd.append('image', file, nombre);
    return this.http.post(this.base + 'producto/imagen', fd);
  }
  actualizarstock(stock: number, id: number): Observable<Producto[]> {
    return this.http.put<Producto[]>(this.base + 'producto/' + id, stock);
  }
  actualizarstockplus(stock: number, id: number): Observable<Producto[]> {
    return this.http.put<Producto[]>(this.base + 'producto/' + id, stock);
  }
  storeMultiple(formulario: any): Observable<any[]> {
    return this.http.post<any[]>(
      this.base + 'producto/storeMultiple',
      formulario
    );
  }
  reporteinventariogeneral(
    dia1: any,
    mes1: any,
    gestion1: any,
    dia2: any,
    mes2: any,
    gestion2: any
  ): Observable<any[]> {
    return this.http.get<any[]>(
      this.base +
        'producto/reporteinventariogeneral/' +
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
        'producto/reporte/' +
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
  reportecomprasventasproducto(
    dia1: any,
    mes1: any,
    gestion1: any,
    dia2: any,
    mes2: any,
    gestion2: any,
    codigo: any
  ): Observable<any[]> {
    return this.http.get<any[]>(
      this.base +
        'producto/reportedemovimientodeproducto/' +
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
        codigo
    );
  }
}
