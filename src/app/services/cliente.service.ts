import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments.prod';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }
  
  base = environment.base
  listar(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.base + 'cliente')
  }

  async obtenerDatos(): Promise<any> {
    return this.http.get<any>(this.base + 'cliente').toPromise();
  }

  eliminar(id:number): Observable<Cliente[]> {
    return this.http.delete<Cliente[]>(this.base + 'cliente/'+id)
  }
  agregar(formulario:Cliente): Observable<Cliente[]> {
    return this.http.post<Cliente[]>(this.base + 'cliente/',formulario)
  }
  actualizar(formulario:Cliente,id:number): Observable<Cliente[]> {
    return this.http.put<Cliente[]>(this.base + 'cliente/'+id,formulario)
  }
  
  subirimagen(file:File,nombre:string): Observable<any> {
    const fd = new FormData
    fd.append('image',file,nombre)
    return this.http.post(this.base + 'cliente/imagen',fd)
  }
  
}
