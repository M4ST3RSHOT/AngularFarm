import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environments.prod';
import { Observable, map } from 'rxjs';
import { Factura } from '../models/factura';
import { Personal } from '../models/personal';
import { Detalle } from '../models/detalle';
import { Producto } from '../models/producto';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  constructor(private http: HttpClient) { }

  base = environment.base
  listar(): Observable<any[]> {
    return this.http.get<any[]>(this.base + 'factura')
  }
  eliminar(id:number): Observable<Factura[]> {
    return this.http.delete<Factura[]>(this.base + 'factura/'+id)
  }
  agregar(formulario:Factura): Observable<number> {
    return this.http.post<any>(this.base + 'factura/',formulario).pipe(map(response=>{return response.id})) // con este cambio, al momento de agregar una factura nos devuelve el id y lo trasforema a una solo caracter,de lo que era un objeto con el caracter
  }
  actualizar(formulario:Factura,id:number): Observable<Factura[]> {
    return this.http.put<Factura[]>(this.base + 'factura/'+id,formulario)
  }
  detallar(id:number): Observable<any[]> {
    return this.http.get<any[]>(this.base + 'factura/detallar/'+id)
  }

  // async factura_factura(id:number): Promise<Factura[]> {
  //   try {
  //     const response = await this.http.get<any>(this.base + 'factura/factura/'+id).toPromise();
  //     return response;
  //   } catch (error) {
  //     console.error('Error al obtener datos:', error);
  //     throw error; 
  //   }
  // }

  // async factura_personal(id:number): Promise<Personal[]> {
  //   try {
  //     const response = await this.http.get<any>(this.base + 'factura/personal/'+id).toPromise();
  //     return response;
  //   } catch (error) {
  //     console.error('Error al obtener datos:', error);
  //     throw error; 
  //   }
  // }

  // async factura_producto(id:number): Promise<Producto[]> {
  //   try {
  //     const response = await this.http.get<any>(this.base + 'factura/producto/'+id).toPromise();
  //     return response;
  //   } catch (error) {
  //     console.error('Error al obtener datos:', error);
  //     throw error; 
  //   }
  // }

  // async factura_detalle(id:number): Promise<Detalle[]> {
  //   try {
  //     const response = await this.http.get<any>(this.base + 'factura/detalle/'+id).toPromise();
  //     return response;
  //   } catch (error) {
  //     console.error('Error al obtener datos:', error);
  //     throw error; 
  //   }
  // }



  
}
