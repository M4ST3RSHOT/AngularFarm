import { Component } from '@angular/core';
import { ProveedorService } from '../services/proveedor.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../environments/environments.prod';
import { Proveedor } from '../models/proveedor';
import Swal from 'sweetalert2';
import { CrearProveedorComponent } from './crear-proveedor/crear-proveedor.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrl: './proveedor.component.css'
})
export class ProveedorComponent {

  constructor(private route:Router, private proveedorServ: ProveedorService, public dialog: MatDialog, private toastr:ToastrService) { }
  base = environment.base
  proveedor: Proveedor[] = []
  type:string | null | undefined
  ngOnInit(): void {
    
    this.type = localStorage.getItem("access")
    if(this.type=="" ||this.type=="2" ||this.type=="3" )
    {      
      this.toastr.warning("No tiene acceso",'Inicia sesion');
      this.route.navigate(["/home"]);
    }
    this.proveedorServ.listar().subscribe(data => {
      this.proveedor = data
    })
  }

  eliminar(item:Proveedor):void{
    Swal.fire({
      title: 'Esta seguro que quieres eliminar este proveedor?',
      text: item.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar.',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        Swal.fire('Eliminado!', 'El usuario a sido eliminado exitosamente', 'success');
        this.proveedorServ.eliminar(item.id).subscribe(data=>{
          this.proveedor=data
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado', 'No se elimino el registro', 'error');
      }
    });
  }


  openDialog() {
    let proveedor:Proveedor
    proveedor={
      id: 0,
    nombre: '',
    cinit: '',
    telefono: '',
    direccion: '',
    }
    const dialogRef = this.dialog.open(CrearProveedorComponent,{data:{proveedor:proveedor,texto:"Crear Proveedor"}});

    
    dialogRef.afterClosed().subscribe(result => {
      proveedor={
        id: 0,
      nombre: result.value.nombre,
      cinit: result.value.nombre,
      telefono: result.value.telefono,
      direccion: result.value.direccion,
      }
      this.proveedorServ.agregar(proveedor).subscribe(data=>{
        this.proveedor=data
        this.toastr.success('Exito','Registro guardado')
      },
      error=>{
        this.toastr.error('Error','Operacion Cancelada')   
      })
    });
  }


  actualizar(item:Proveedor) {
    let proveedor:Proveedor
    const dialogRef = this.dialog.open(CrearProveedorComponent,{data:{proveedor:item,texto:"Editar Proveedor"}});
    dialogRef.afterClosed().subscribe(result => {
      proveedor={
      id: item.id,
      nombre: result.value.nombre,
      cinit: result.value.cinit,
      telefono: result.value.telefono,
      direccion: result.value.direccion,
      }
      this.proveedorServ.actualizar(proveedor,item.id).subscribe(data=>{
        this.proveedor=data
        this.toastr.success('Exito','Registro Actualizado')
      },
      error=>{
        this.toastr.error('Error','Operacion Cancelada')
      })
    });
  }

}
