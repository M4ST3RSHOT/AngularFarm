import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PersonalComponent } from '../personal.component';
import { Personal } from '../../models/personal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


@Component({
  selector: 'app-crear-personal',
  templateUrl: './crear-personal.component.html',
  styleUrl: './crear-personal.component.css',
  
})
export class CrearPersonalComponent {

  myControl = new FormControl('');
  options: string[] = ['Administrador', 'Ventas', 'Inventario'];

constructor(public dialogRef:MatDialogRef<PersonalComponent>, @ Inject (MAT_DIALOG_DATA) public data:Personal){
  this.nombre?.setValue(data.nombre)
  this.apellido?.setValue(data.apellido)
  this.password?.setValue(data.password)
  this.fecha_inicio?.setValue(data.fecha_inicio)
  this.tipo?.setValue(data.tipo)
  this.ci?.setValue(data.ci)
  this.correo?.setValue(data.correo)
  this.telefono?.setValue(data.telefono)
  this.direccion?.setValue(data.direccion)
  this.salario?.setValue(data.salario)
  this.imagen?.setValue(data.imagen)
  this.farmacia_id?.setValue(data.farmacia_id)

}


agregar=new FormGroup({
  id: new FormControl('',[]),
  nombre: new FormControl('',[Validators.required]),
  apellido: new FormControl('',[Validators.required]),
  password: new FormControl('',[Validators.required]),
  fecha_inicio: new FormControl('',[Validators.required]),
  tipo: new FormControl('',[Validators.required]),
  ci: new FormControl('',[Validators.required]),
  correo: new FormControl('',[Validators.required,Validators.email]),
  telefono: new FormControl('',[Validators.required]),
  direccion: new FormControl('',[Validators.required]),
  salario: new FormControl('',[Validators.required]),
  imagen: new FormControl('',[Validators.required]),
  farmacia_id: new FormControl('',[Validators.required]),
})

get nombre(){return this.agregar.get('nombre')}
get apellido(){return this.agregar.get('apellido')}
get password(){return this.agregar.get('password')}
get fecha_inicio(){return this.agregar.get('fecha_inicio')}
get tipo(){return this.agregar.get('tipo')}
get ci(){return this.agregar.get('ci')}
get correo(){return this.agregar.get('correo')}
get telefono(){return this.agregar.get('telefono')}
get direccion(){return this.agregar.get('direccion')}
get salario(){return this.agregar.get('salario')}
get imagen(){return this.agregar.get('imagen')}
get farmacia_id(){return this.agregar.get('farmacia_id')}


error_nombre():string{
  if(this.nombre?.hasError('required'))
  return "Campo obligatorio"
return ""
}

error_correo():string{
  if(this.correo?.hasError('required'))
    return "Campo obligatorio"
  if(this.correo?.hasError('email'))
    return "Ingrese el formato de un correo electronico"
return""
}

}
