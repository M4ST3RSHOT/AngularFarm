import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environments.prod';
import { Observable } from 'rxjs';
import { Proveedor } from '../models/proveedor';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  constructor(private http: HttpClient) { }

   base = environment.base
  listar(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(this.base + 'proveedor')
  }
  eliminar(id:number): Observable<Proveedor[]> {
    return this.http.delete<Proveedor[]>(this.base + 'proveedor/'+id)
  }
  agregar(formulario:Proveedor): Observable<Proveedor[]> {
    return this.http.post<Proveedor[]>(this.base + 'proveedor/',formulario)
  }
  actualizar(formulario:Proveedor,id:number): Observable<Proveedor[]> {
    return this.http.put<Proveedor[]>(this.base + 'proveedor/'+id,formulario)
  }
  
  subirimagen(file:File,nombre:string): Observable<any> {
    const fd = new FormData
    fd.append('image',file,nombre)
    return this.http.post(this.base + 'proveedor/imagen',fd)
  }

  listarproductosproveedor(id:number): Observable<any[]> {
    return this.http.get<any[]>(this.base + 'proveedor/productos/'+id)
  }
}
