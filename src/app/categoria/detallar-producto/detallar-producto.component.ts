import { Component, Inject } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto';
import { environment } from '../../environments/environments.prod';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoriaComponent } from '../categoria.component';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-detallar-producto',
  templateUrl: './detallar-producto.component.html',
  styleUrl: './detallar-producto.component.css'
})
export class DetallarProductoComponent {

constructor(public dialogRef:MatDialogRef<CategoriaComponent>, @ Inject (MAT_DIALOG_DATA) public data:any, private categoriaserv:CategoriaService){

}
base = environment.base
producto: Producto[] = []
ngOnInit(): void {
  this.categoriaserv.listarproductoscategoria(this.data.id).subscribe(a => {
    this.producto = a
})
}

llenar_imagen(nombre: string): string {
  return this.base + 'producto/imagen/' + nombre
}

}