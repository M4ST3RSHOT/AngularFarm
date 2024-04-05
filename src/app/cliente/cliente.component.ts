import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../services/cliente.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../environments/environments.prod';
import { Cliente } from '../models/cliente';
import Swal from 'sweetalert2';
import { CrearClienteComponent } from './crear-cliente/crear-cliente.component';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})

export class ClienteComponent implements OnInit{

  constructor(private clienteServ: ClienteService, public dialog: MatDialog, private toastr:ToastrService) { }
  base = environment.base
  cliente: Cliente[] = []

  
  ngOnInit(): void {
    this.clienteServ.listar().subscribe(data => {
      this.cliente = data
    })
  }

  llenar_imagen(nombre: string): string {
    return this.base + 'cliente/imagen/' + nombre
  }

  eliminar(item:Cliente):void{
    Swal.fire({
      title: 'Esta seguro que quieres eliminar este registro?',
      text: item.apellido+" "+item.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar.',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        Swal.fire('Eliminado!', 'El usuario a sido eliminado exitosamente', 'success');
        this.clienteServ.eliminar(item.id).subscribe(data=>{
          this.cliente=data
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado', 'No se elimino el registro', 'error');
      }
    });
  }


  openDialog() {
    let cliente:Cliente
    cliente={
    id: 0,
    nombre: '',
    apellido: '',
    fecha_nacimiento: '',
    ci: '',
    correo: '',
    telefono: '',
    imagen: '',
    }
    const dialogRef = this.dialog.open(CrearClienteComponent,{data:{cliente:cliente,texto:"Crear Cliente"}});

    
    dialogRef.afterClosed().subscribe(result => {
      cliente={
        id: 0,
      nombre: result.value.nombre,
      apellido: result.value.apellido,
      fecha_nacimiento: result.value.fecha_nacimiento,
      ci: result.value.ci,
      correo: result.value.correo,
      telefono: result.value.telefono,
      imagen: result.value.nombreimagen,
      }
      console.log()
      cliente.fecha_nacimiento=this.convertirfecha(cliente.fecha_nacimiento)
      this.clienteServ.agregar(cliente).subscribe(data=>{
        this.cliente=data
        this.toastr.success('Exito','Registro guardado')
      },
      error=>{
        this.toastr.error('Error','Operacion Cancelada')   
      })
    });
  }


  actualizar(item:Cliente) {
    let cliente:Cliente
    const dialogRef = this.dialog.open(CrearClienteComponent,{data:{cliente:item,texto:"Editar Cliente"}});
    dialogRef.afterClosed().subscribe(result => {
      cliente={
      id: item.id,
      nombre: result.value.nombre,
      apellido: result.value.apellido,
      fecha_nacimiento: result.value.fecha_nacimiento,
      ci: result.value.ci,
      correo: result.value.correo,
      telefono: result.value.telefono,
      imagen: result.value.nombreimagen,
      }
      cliente.fecha_nacimiento=this.convertirfecha(cliente.fecha_nacimiento)
      this.clienteServ.actualizar(cliente,item.id).subscribe(data=>{
        this.cliente=data
        this.toastr.success('Exito','Registro Actualizado')
      },
      error=>{
        this.toastr.error('Error','Operacion Cancelada')
      })
    });
  }
  
  convertirStringADate(fechaString: string): Date {
    return new Date(fechaString);
  }

  convertirfecha(fecha: string): string {
    const fechaConvertida = this.convertirStringADate(fecha);
    const anio = fechaConvertida.getFullYear();
    const mes = fechaConvertida.getMonth() + 1; // Se agrega 1 porque getMonth() devuelve valores de 0 a 11
    const dia = fechaConvertida.getDate();
    fecha=anio+"-"+mes+"-"+dia
    return fecha
  }

}
