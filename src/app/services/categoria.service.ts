import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments.prod';
import { Categoria } from '../models/categoria';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) { }

  base = environment.base

  listar(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.base + 'categoria')
  }
  eliminar(id:number): Observable<Categoria[]> {
    return this.http.delete<Categoria[]>(this.base + 'categoria/'+id)
  }
  agregar(formulario:Categoria): Observable<Categoria[]> {
    return this.http.post<Categoria[]>(this.base + 'categoria/',formulario)
  }
  actualizar(formulario:Categoria,id:number): Observable<Categoria[]> {
    return this.http.put<Categoria[]>(this.base + 'categoria/'+id,formulario)
  }
  subirimagen(file:File,nombre:string): Observable<any> {
    const fd = new FormData
    fd.append('image',file,nombre)
    return this.http.post(this.base + 'categoria/imagen',fd)
  }

  listarproductoscategoria(id:number): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.base + 'categoria/productos/'+id)
  }

}
