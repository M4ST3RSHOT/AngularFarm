import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments.prod';
import { Personal } from '../models/personal';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  constructor(private http: HttpClient) { }

  base = environment.base
  listar(): Observable<Personal[]> {
    return this.http.get<Personal[]>(this.base + 'personal')
  }
  eliminar(id:number): Observable<Personal[]> {
    return this.http.delete<Personal[]>(this.base + 'personal/'+id)
  }
  agregar(formulario:Personal): Observable<Personal[]> {
    return this.http.post<Personal[]>(this.base + 'personal/',formulario)
  }
  actualizar(formulario:Personal,id:number): Observable<Personal[]> {
    return this.http.put<Personal[]>(this.base + 'personal/'+id,formulario)
  }
}
