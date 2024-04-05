import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { environment } from '../../environments/environments.prod';
import { ProductoComponent } from '../producto.component';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrl: './crear-producto.component.css'
})
export class CrearProductoComponent {

  texto:string=""
  public name:string = ""
  base = environment.base
  public previsualizacion:string = ""
  myControl = new FormControl('');
  options: string[] = ['Administrador', 'Ventas', 'Inventario'];

  constructor(public dialogRef:MatDialogRef<ProductoComponent>, @ Inject (MAT_DIALOG_DATA) public data:any, private productoserv:ProductoService){
  
    this.texto=data.texto
    this.nombre?.setValue(data.producto.nombre)
    this.descripcion?.setValue(data.producto.descripcion)
    this.unidad?.setValue(data.producto.unidad)
    this.peso?.setValue(data.producto.peso)
    this.categoria_id?.setValue(data.producto.categoria_id)
    this.precio_compra?.setValue(data.producto.precio_compra)
    this.precio_venta?.setValue(data.producto.precio_venta)
    if(data.producto.imagen!=""){this.previsualizacion= this.base + 'producto/imagen/' + data.producto.imagen}
    this.stock?.setValue(data.producto.stock)
  
  }

  agregar=new FormGroup({
    id: new FormControl('',[]),
    nombre: new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]),
    descripcion: new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]),
    unidad: new FormControl('',[Validators.pattern(/^[a-zA-Z\s]*$/)]),
    peso: new FormControl('',[Validators.required, Validators.pattern(/^-?\d+$/)]),
    categoria_id: new FormControl('',[Validators.required]),
    precio_compra: new FormControl('',[Validators.required, Validators.pattern(/^-?\d+$/)]),
    precio_venta: new FormControl('',[Validators.required, Validators.pattern(/^-?\d+$/)]),
    imagen: new FormControl('',[Validators.required]),
    nombreimagen: new FormControl('',[]), 
    stock: new FormControl('',[]), 
  })

  get nombre(){return this.agregar.get('nombre')}
  get descripcion(){return this.agregar.get('descripcion')}
  get unidad(){return this.agregar.get('unidad')}
  get peso(){return this.agregar.get('peso')}
  get categoria_id(){return this.agregar.get('categoria_id')}
  get precio_compra(){return this.agregar.get('precio_compra')}
  get precio_venta(){return this.agregar.get('precio_venta')}
  get imagen(){return this.agregar.get('imagen')}
  get nombreimagen(){return this.agregar.get('nombreimagen')}
  get stock(){return this.agregar.get('stock')}

  error_nombre():string{
    if(this.nombre?.hasError('required'))
    return "Campo obligatorio"
    if(this.nombre?.hasError('pattern'))
    return "Ingrese solamente letras"
  return ""
  }

  error_descripcion():string{
    if(this.nombre?.hasError('required'))
    return "Campo obligatorio"
    if(this.nombre?.hasError('pattern'))
    return "Ingrese solamente letras"
  return ""
  }

  error_unidad():string{
    if(this.nombre?.hasError('required'))
    return "Campo obligatorio"
    if(this.nombre?.hasError('pattern'))
    return "Ingrese solamente letras"
  return ""
  }

  error_peso():string{
    if(this.nombre?.hasError('required'))
    return "Campo obligatorio"
    if(this.nombre?.hasError('pattern'))
    return "Ingrese solamente numeros"
  return ""
  }

  error_categoria_id():string{
    if(this.nombre?.hasError('required'))
    return "Campo obligatorio"
  return ""
  }
  
  error_precio_compra():string{
    if(this.nombre?.hasError('required'))
    return "Campo obligatorio"
    if(this.nombre?.hasError('pattern'))
    return "Ingrese solamente numeros"
  return ""
  }

  error_precio_venta():string{
    if(this.nombre?.hasError('required'))
    return "Campo obligatorio"
    if(this.nombre?.hasError('pattern'))
    return "Ingrese solamente numeros"
  return ""
  }

  error_imagen():string{
    if(this.nombre?.hasError('required'))
    return "Campo obligatorio"
  return ""
  }

  cargarimagen(event:any):void{
    let file:File=<File>event.target.files[0]
    this.name=file.name
    this.nombreimagen?.setValue(this.name)
    this.previsualizar(file)
    this.productoserv.subirimagen(file,this.name).subscribe(data=>{})
  }
  
  previsualizar(file:File):void{
    const reader=new FileReader()
    reader.onload=(e:any)=>{
      this.previsualizacion=e.target.result
    };
    reader.readAsDataURL(file);
  }

}
