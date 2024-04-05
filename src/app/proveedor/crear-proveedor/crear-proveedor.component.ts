import { Component, Inject } from '@angular/core';
import { environment } from '../../environments/environments.prod';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProveedorComponent } from '../proveedor.component';
import { ProveedorService } from '../../services/proveedor.service';

@Component({
  selector: 'app-crear-proveedor',
  templateUrl: './crear-proveedor.component.html',
  styleUrl: './crear-proveedor.component.css'
})
export class CrearProveedorComponent {

  texto:string=""
  public name:string = ""
  base = environment.base
  public previsualizacion:string = ""
  myControl = new FormControl('');
  options: string[] = ['Administrador', 'Ventas', 'Inventario'];

constructor(public dialogRef:MatDialogRef<ProveedorComponent>, @ Inject (MAT_DIALOG_DATA) public data:any, private proveedorServ:ProveedorService){
 
  this.texto=data.texto
  this.nombre?.setValue(data.proveedor.nombre)
  this.telefono?.setValue(data.proveedor.telefono)
  this.direccion?.setValue(data.proveedor.direccion)

}


agregar=new FormGroup({
  id: new FormControl('',[]),
  nombre: new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]),
  telefono: new FormControl('',[Validators.required, Validators.pattern(/^-?\d+$/)]),
  direccion: new FormControl('',[Validators.required]),
})

get nombre(){return this.agregar.get('nombre')}
get telefono(){return this.agregar.get('telefono')}
get direccion(){return this.agregar.get('direccion')}

error_nombre():string{
  if(this.nombre?.hasError('required'))
  return "Campo obligatorio"
  if(this.nombre?.hasError('pattern'))
  return "Ingrese solamente letras"
return ""
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


}
