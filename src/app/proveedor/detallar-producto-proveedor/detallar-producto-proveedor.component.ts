import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProveedorComponent } from '../proveedor.component';
import { ProveedorService } from '../../services/proveedor.service';
import { environment } from '../../environments/environments.prod';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-detallar-producto-proveedor',
  templateUrl: './detallar-producto-proveedor.component.html',
  styleUrl: './detallar-producto-proveedor.component.css'
})
export class DetallarProductoProveedorComponent {

  constructor(public dialogRef:MatDialogRef<ProveedorComponent>, @ Inject (MAT_DIALOG_DATA) public data:any, private proveedorserv:ProveedorService){
  
  }
  base = environment.base
  producto: any[] = []
  ngOnInit(): void {
    this.proveedorserv.listarproductosproveedor(this.data.id).subscribe(a => {
      this.producto = a
  })
  }
  
  llenar_imagen(nombre: string): string {
    return this.base + 'producto/imagen/' + nombre
  }
  
  }