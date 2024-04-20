import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer '+localStorage.getItem('token'));

  mostrar(nombre:string): Observable<Personal[]> {
    return this.http.get<Personal[]>(this.base + 'user'+nombre)
  }
  listar(): Observable<Personal[]> {
    return this.http.get<Personal[]>(this.base + 'user', { headers:this.headers })
  }
  eliminar(id:number): Observable<Personal[]> {
    return this.http.delete<Personal[]>(this.base + 'user/'+id, { headers:this.headers })
  }
  agregar(formulario:Personal): Observable<Personal[]> {
    return this.http.post<Personal[]>(this.base + 'user/',formulario, { headers:this.headers })
  }
  actualizar(formulario:Personal,id:number): Observable<Personal[]> {
    return this.http.put<Personal[]>(this.base + 'user/'+id,formulario, { headers:this.headers })
  }
  
  
  subirimagen(file:File,nombre:string): Observable<any> {
    const fd = new FormData
    fd.append('image',file,nombre)
    return this.http.post(this.base + 'user/imagen',fd)
  }
  
}
