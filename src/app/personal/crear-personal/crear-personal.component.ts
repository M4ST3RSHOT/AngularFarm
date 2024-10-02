import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PersonalComponent } from '../personal.component';
import { Personal } from '../../models/personal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { environment } from '../../environments/environments.prod';
import { PersonalService } from '../../services/personal.service';


@Component({
  selector: 'app-crear-personal',
  templateUrl: './crear-personal.component.html',
  styleUrl: './crear-personal.component.css',
  
})
export class CrearPersonalComponent {
  texto:string=""
  public name:string = ""
  base = environment.base
  public previsualizacion:string = ""
  myControl = new FormControl('');
  options: string[] = ['Administrador', 'Ventas', 'Inventario'];

constructor(public dialogRef:MatDialogRef<PersonalComponent>, @ Inject (MAT_DIALOG_DATA) public data:any, private personalserv:PersonalService){
  this.texto=data.texto
  this.nombre?.setValue(data.personal.nombre)
  this.apellido?.setValue(data.personal.apellido)
  this.password?.setValue(data.personal.password)
  if(data.texto=="Editar Usuario"){
    this.password?.clearValidators() 
    this.imagen?.clearValidators()}
  this.fecha_inicio?.setValue(data.personal.fecha_inicio)
  
  this.tipo?.setValue(data.personal.tipo)
  this.ci?.setValue(data.personal.ci)
  this.correo?.setValue(data.personal.correo)
  this.telefono?.setValue(data.personal.telefono)
  this.direccion?.setValue(data.personal.direccion)
  this.salario?.setValue(data.personal.salario)
  // this.imagen?.setValue(data.personal.imagen)
  if(data.personal.imagen!=""){this.previsualizacion= this.base + 'personal/imagen/' + data.personal.imagen}
  this.farmacia_id?.setValue(data.personal.farmacia_id)

}


agregar=new FormGroup({
  id: new FormControl('',[]),
  nombre: new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]),
  apellido: new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]),
  password: new FormControl('',[Validators.required]),
  fecha_inicio: new FormControl('',[Validators.required]),
  tipo: new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]),
  ci: new FormControl('',[Validators.required, Validators.pattern(/^-?\d+$/)]),
  correo: new FormControl('',[Validators.required,Validators.email]),
  telefono: new FormControl('',[Validators.required, Validators.pattern(/^-?\d+$/)]),
  direccion: new FormControl('',[Validators.required]),
  salario: new FormControl('',[Validators.required, Validators.pattern(/^-?\d+$/)]),
  imagen: new FormControl('',[Validators.required]),
  farmacia_id: new FormControl('',[Validators.required]),
  nombreimagen: new FormControl('',[]),
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
get nombreimagen(){return this.agregar.get('nombreimagen')}

error_nombre():string{
  if(this.nombre?.hasError('required'))
  return "Campo obligatorio"
  if(this.nombre?.hasError('pattern'))
  return "Ingrese solamente letras"
return ""
}

error_apellido():string{
  if(this.apellido?.hasError('required'))
  return "Campo obligatorio"
  if(this.apellido?.hasError('pattern'))
  return "Ingrese solamente letras"
return ""
}

error_password():string{
  if(this.password?.hasError('required'))
  return "Campo obligatorio"
return ""
}

error_fecha_inicio():string{
  if(this.fecha_inicio?.hasError('required'))
  return "Campo obligatorio"
return ""
}

error_tipo():string{
  if(this.tipo?.hasError('required'))
  return "Campo obligatorio"
  if(this.tipo?.hasError('pattern'))
  return "Ingrese solamente letras"
return ""
}

error_ci():string{
  if(this.ci?.hasError('required'))
  return "Campo obligatorio"
  if(this.ci?.hasError('pattern'))
  return "Ingrese solamente numeros"
return ""
}

error_correo():string{
  if(this.correo?.hasError('required'))
    return "Campo obligatorio"
  if(this.correo?.hasError('email'))
    return "Ingrese el formato de un correo electronico"
return""
}

error_telefono():string{
  if(this.telefono?.hasError('required'))
  return "Campo obligatorio"
  if(this.telefono?.hasError('pattern'))
  return "Ingrese solamente numeros"
return ""
}

error_direccion():string{
  if(this.direccion?.hasError('required'))
  return "Campo obligatorio"
return ""
}

error_salario():string{
  if(this.salario?.hasError('required'))
  return "Campo obligatorio"
  if(this.salario?.hasError('pattern'))
  return "Ingrese solamente numeros"
return ""
}

error_imagen():string{
  if(this.imagen?.hasError('required'))
  return "Campo obligatorio"
return ""
}

cargarimagen(event:any):void{
  let file:File=<File>event.target.files[0]
  this.name=file.name
  this.nombreimagen?.setValue(this.name)
  this.previsualizar(file)
  this.personalserv.subirimagen(file,this.name).subscribe(data=>{})
}

previsualizar(file:File):void{
  const reader=new FileReader()
  reader.onload=(e:any)=>{
    this.previsualizacion=e.target.result
  };
  reader.readAsDataURL(file);
}

}
