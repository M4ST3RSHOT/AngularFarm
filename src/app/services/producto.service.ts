import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environments.prod';
import { Producto } from '../models/producto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) { }

  base = environment.base

  listar(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.base + 'producto')
  }
  mostrar(id:number): Observable<Producto> {
    return this.http.get<Producto>(this.base + 'producto/'+id)
  }
  eliminar(id:number): Observable<Producto[]> {
    return this.http.delete<Producto[]>(this.base + 'producto/'+id)
  }
  agregar(formulario:Producto): Observable<Producto[]> {
    return this.http.post<Producto[]>(this.base + 'producto/',formulario)
  }
  actualizar(formulario:Producto,id:number): Observable<Producto[]> {
    return this.http.put<Producto[]>(this.base + 'producto/'+id,formulario)
  }
  subirimagen(file:File,nombre:string): Observable<any> {
    const fd = new FormData
    fd.append('image',file,nombre)
    return this.http.post(this.base + 'producto/imagen',fd)
  }
  actualizarstock(stock:number,id:number): Observable<Producto[]> {
    return this.http.put<Producto[]>(this.base + 'producto/'+id,stock)
  }
  
}
