import { Component } from '@angular/core';
import { CrearProductoComponent } from './crear-producto/crear-producto.component';
import { OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from './producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent implements OnInit {


  constructor(private dialog: MatDialog, private productoServ: ProductoService, private mensaje: ToastrService) { }
  productos: any = []
  ngOnInit(): void {
    this.productoServ.listar().subscribe((data: any) => {
      this.productos = data
    })
  }
  delete(producto: any) {
    console.log(producto)
    this.productoServ.eliminar(producto.id).subscribe((data: any) => {
      this.productos = data
      this.mensaje.success('Exito', 'Producto Eliminado')
    },
      error => {
        this.mensaje.error('Error', 'No se pudo eliminar')
        console.log(error)
      }
    )
  }
  update(producto: any) {

  }
  abrirDialogo() {
    let data;
    const dialogo1 = this.dialog.open(CrearProductoComponent, { data });
    dialogo1.afterClosed().subscribe(art => {
      if (art == undefined)
        this.mensaje.info('Operacion Cancelada')
      else {
        this.productoServ.nuevo(art.value).subscribe((data: any) => {
          this.productos = data
          this.mensaje.success('Exito', 'Cliente Registrado')
        },
          error => {
            this.mensaje.error('Error', 'Error de conexion 500')
          })
      }
    })
  }


}
