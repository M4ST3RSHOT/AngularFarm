import { Component, OnInit } from '@angular/core';
import { FacturaService } from '../services/factura.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../environments/environments.prod';
import { Factura } from '../models/factura';
import { Personal } from '../models/personal';
import { Producto } from '../models/producto';
import { Detalle } from '../models/detalle';
import Swal from 'sweetalert2';
import { NuevaFacturaComponent } from './nueva-factura/nueva-factura.component';
import { Router } from '@angular/router';
import { identifierName } from '@angular/compiler';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrl: './factura.component.css'
})
export class FacturaComponent implements OnInit{

  constructor(private route:Router,private facturaserv: FacturaService, public dialog: MatDialog, private toastr:ToastrService, private router:Router) { }
  base = environment.base
  factura: Factura[] = []
  a1:number=0

  type:string | null | undefined
  ngOnInit(): void {
    this.type = localStorage.getItem("access")
    if(this.type==""||this.type=="3" )
    {      
      this.toastr.warning("No tiene acceso",'Inicia sesion');
      this.route.navigate(["/home"]);
    }
    this.facturaserv.listar().subscribe(data => {
      this.factura = data
    })
  }


  nueva_factura():void {
    this.router.navigate(['/crear-venta']);

  }


  actualizar_factura(item:Factura):void {
    this.a1=item.id
      this.router.navigate(['/actualizar-venta', this.a1]);
  }

  eliminar_factura(item:Factura):void{
    Swal.fire({
      title: 'Esta seguro que quieres eliminar este registro?',
      text: item.fecha+" "+item.id,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar.',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        Swal.fire('Eliminado!', 'El usuario a sido eliminado exitosamente', 'success');
        this.facturaserv.eliminar(item.id).subscribe(data=>{
          this.factura=data
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado', 'No se elimino el registro', 'error');
      }
    });
  }


}
