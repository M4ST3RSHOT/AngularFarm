import { Component, OnInit } from '@angular/core';
import { PersonalService } from '../services/personal.service';
import { ToastrService } from 'ngx-toastr';
import { Personal } from '../models/personal';
import { environment } from '../environments/environments.prod';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import Swal from 'sweetalert2';
import { CrearPersonalComponent } from './crear-personal/crear-personal.component';
import { error } from 'node:console';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import { animation } from '@angular/animations';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrl: './personal.component.css'
})

export class PersonalComponent implements OnInit {
  constructor(private personalServ: PersonalService, public dialog: MatDialog, private toastr:ToastrService) { }
  base = environment.base
  personal: Personal[] = []

  
  ngOnInit(): void {
    this.personalServ.listar().subscribe(data => {
      this.personal = data
      console.log(data)
    })
  }

  llenar_imagen(nombre: string): string {
    return this.base + 'personal/imagen/' + nombre
  }

  eliminar(item:Personal):void{
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
        this.personalServ.eliminar(item.id).subscribe(data=>{
          this.personal=data
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado', 'No se elimino el registro', 'error');
      }
    });
  }


  openDialog() {
    let personal:Personal
    personal={
      id: 0,
    nombre: '',
    apellido: '',
    password: '',
    fecha_inicio: '',
    tipo: '',
    ci: '',
    correo: '',
    telefono: '',
    direccion: '',
    salario: '',
    imagen: '',
    farmacia_id: '1',
    }
    const dialogRef = this.dialog.open(CrearPersonalComponent,{data:{personal:personal,texto:"Crear Usuario"}});

    
    dialogRef.afterClosed().subscribe(result => {
      personal={
        id: 0,
      nombre: result.value.nombre,
      apellido: result.value.apellido,
      password: result.value.password,
      fecha_inicio: result.value.fecha_inicio,
      tipo: result.value.tipo,
      ci: result.value.ci,
      correo: result.value.correo,
      telefono: result.value.telefono,
      direccion: result.value.direccion,
      salario: result.value.salario,
      imagen: result.value.nombreimagen,
      farmacia_id: '1',
      }
      console.log()
      personal.fecha_inicio=this.convertirfecha(personal.fecha_inicio)
      this.personalServ.agregar(personal).subscribe(data=>{
        this.personal=data
        this.toastr.success('Exito','Registro guardado')
      },
      error=>{
        this.toastr.error('Error','Operacion Cancelada')   
      })
    });
  }


  actualizar(item:Personal) {
    let personal:Personal
    const dialogRef = this.dialog.open(CrearPersonalComponent,{data:{personal:item,texto:"Editar Usuario"}});
    dialogRef.afterClosed().subscribe(result => {
      personal={
      id: item.id,
      nombre: result.value.nombre,
      apellido: result.value.apellido,
      password: result.value.password,
      fecha_inicio: result.value.fecha_inicio,
      tipo: result.value.tipo,
      ci: result.value.ci,
      correo: result.value.correo,
      telefono: result.value.telefono,
      direccion: result.value.direccion,
      salario: result.value.salario,
      imagen: result.value.nombreimagen,
      farmacia_id: '1',
      }
      personal.fecha_inicio=this.convertirfecha(personal.fecha_inicio)
      this.personalServ.actualizar(personal,item.id).subscribe(data=>{
        this.personal=data
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
