import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environments.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) { }
  base = environment.base
  listar() {
    return this.http.get(this.base + 'producto')
  }
  nuevo(form: any) {
    return this.http.post(this.base + 'producto', form)
  }
  actualizar(form: any, id: any) {
    return this.http.put(this.base + 'producto/' + id, form)
  }
  eliminar(id: any) {
    return this.http.delete(this.base + 'producto/' + id)
  }
}
