import { Component, Inject } from '@angular/core';
import { environment } from '../../environments/environments.prod';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClienteComponent } from '../cliente.component';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrl: './crear-cliente.component.css'
})
export class CrearClienteComponent {
  
  texto:string=""
  public name:string = ""
  base = environment.base
  public previsualizacion:string = ""
  myControl = new FormControl('');
  options: string[] = ['Administrador', 'Ventas', 'Inventario'];

constructor(public dialogRef:MatDialogRef<ClienteComponent>, @ Inject (MAT_DIALOG_DATA) public data:any, private clienteserv:ClienteService){
  this.texto=data.texto
  this.nombre?.setValue(data.cliente.nombre)
  this.apellido?.setValue(data.cliente.apellido)
  this.fecha_nacimiento?.setValue(data.cliente.fecha_nacimiento)
  this.ci?.setValue(data.cliente.ci)
  this.correo?.setValue(data.cliente.correo)
  this.telefono?.setValue(data.cliente.telefono)
  if(data.cliente.imagen!=""){this.previsualizacion= this.base + 'cliente/imagen/' + data.cliente.imagen}

}


agregar=new FormGroup({
  id: new FormControl('',[]),
  nombre: new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]),
  apellido: new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]),
  fecha_nacimiento: new FormControl('',[Validators.required]),
  ci: new FormControl('',[Validators.required, Validators.pattern(/^-?\d+$/)]),
  correo: new FormControl('',[Validators.required,Validators.email]),
  telefono: new FormControl('',[Validators.required, Validators.pattern(/^-?\d+$/)]),
  imagen: new FormControl('',[Validators.required]),
  nombreimagen: new FormControl('',[]),
})

get nombre(){return this.agregar.get('nombre')}
get apellido(){return this.agregar.get('apellido')}
get fecha_nacimiento(){return this.agregar.get('fecha_nacimiento')}
get ci(){return this.agregar.get('ci')}
get correo(){return this.agregar.get('correo')}
get telefono(){return this.agregar.get('telefono')}
get imagen(){return this.agregar.get('imagen')}
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

error_fecha_nacimiento():string{
  if(this.fecha_nacimiento?.hasError('required'))
  return "Campo obligatorio"
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
  this.clienteserv.subirimagen(file,this.name).subscribe(data=>{})
}

previsualizar(file:File):void{
  const reader=new FileReader()
  reader.onload=(e:any)=>{
    this.previsualizacion=e.target.result
  };
  reader.readAsDataURL(file);
}

}
