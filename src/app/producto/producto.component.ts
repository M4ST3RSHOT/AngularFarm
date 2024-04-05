import { Component } from '@angular/core';
import { CrearProductoComponent } from './crear-producto/crear-producto.component';
import { OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from '../services/producto.service';
import { environment } from '../environments/environments.prod';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import Swal from 'sweetalert2';
import { error } from 'node:console';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import { animation } from '@angular/animations';
import { Producto } from '../models/producto';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent implements OnInit {
  constructor(private productoServ: ProductoService, public dialog: MatDialog, private toastr:ToastrService) { }
  base = environment.base
  producto: Producto[] = []


  ngOnInit(): void {
    this.productoServ.listar().subscribe(data => {
      this.producto = data
    })
  }

  
  llenar_imagen(nombre: string): string {
    return this.base + 'producto/imagen/' + nombre
  }

  eliminar(item:Producto):void{
    Swal.fire({
      title: 'Esta seguro que quieres eliminar este registro?',
      text: item.nombre+" "+item.descripcion,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar.',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        Swal.fire('Eliminado!', 'El usuario a sido eliminado exitosamente', 'success');
        this.productoServ.eliminar(item.id).subscribe(data=>{
          this.producto=data
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado', 'No se elimino el registro', 'error');
      }
    });
  }

  openDialog() {
    let producto:Producto
    producto={
    id:0,
    nombre:'',
    descripcion:'',
    unidad:'',
    peso:'',
    categoria_id:'',
    precio_compra:'',
    precio_venta:'',
    imagen:'',
    stock:'0',
    }
    const dialogRef = this.dialog.open(CrearProductoComponent,{data:{producto:producto,texto:"Crear Producto"}});
    dialogRef.afterClosed().subscribe(result => {
      producto={
      id:0,
      nombre:result.value.nombre,
      descripcion:result.value.descripcion,
      unidad:result.value.unidad,
      peso:result.value.peso,
      categoria_id:result.value.categoria_id,
      precio_compra:result.value.precio_compra,
      precio_venta:result.value.precio_venta,
      imagen:result.value.nombreimagen,
      stock:'0',
      }
      console.log()
      this.productoServ.agregar(producto).subscribe(data=>{
        this.producto=data
        this.toastr.success('Exito','Registro guardado')
      },
      error=>{
        this.toastr.error('Error','Operacion Cancelada')   
      })
    });
  }

  actualizar(item:Producto) {
    let producto:Producto
    const dialogRef = this.dialog.open(CrearProductoComponent,{data:{producto:item,texto:"Editar Producto"}});
    dialogRef.afterClosed().subscribe(result => {
      producto={
        id:item.id,
        nombre:result.value.nombre,
        descripcion:result.value.descripcion,
        unidad:result.value.unidad,
        peso:result.value.peso,
        categoria_id:result.value.categoria_id,
        precio_compra:result.value.precio_compra,
        precio_venta:result.value.precio_venta,
        imagen:result.value.nombreimagen,
        stock:'0',
      }
      this.productoServ.actualizar(producto,item.id).subscribe(data=>{
        this.producto=data
        this.toastr.success('Exito','Registro Actualizado')
      },
      error=>{
        this.toastr.error('Error','Operacion Cancelada')
      })
    });
  }

}
