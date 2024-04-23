import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environments.prod';
import { Observable } from 'rxjs';
import { Lote } from '../models/lote';

@Injectable({
  providedIn: 'root'
})

export class LoteService {

  constructor(private http: HttpClient) { }

  base = environment.base
  listar(): Observable<Lote[]> {
    return this.http.get<Lote[]>(this.base + 'lote')
  }
  eliminar(id:number): Observable<Lote[]> {
    return this.http.delete<Lote[]>(this.base + 'lote/'+id)
  }
  agregar(formulario:Lote): Observable<Lote[]> {
    return this.http.post<Lote[]>(this.base + 'lote/',formulario)
  }
  actualizar(formulario:Lote,id:number): Observable<Lote[]> {
    return this.http.put<Lote[]>(this.base + 'lote/'+id,formulario)
  }
}
