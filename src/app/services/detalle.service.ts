import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Detalle } from '../models/detalle';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments.prod';

@Injectable({
  providedIn: 'root'
})
export class DetalleService {

  constructor(private http: HttpClient) { }

  base = environment.base
  listar(): Observable<Detalle[]> {
    return this.http.get<Detalle[]>(this.base + 'detalle')
  }
  eliminar(id:number): Observable<Detalle[]> {
    return this.http.delete<Detalle[]>(this.base + 'detalle/'+id)
  }
  agregar(formulario:Detalle): Observable<Detalle[]> {
    return this.http.post<Detalle[]>(this.base + 'detalle/',formulario)
  }
  actualizar(formulario:Detalle,id:number): Observable<Detalle[]> {
    return this.http.put<Detalle[]>(this.base + 'detalle/'+id,formulario)
  }
}
