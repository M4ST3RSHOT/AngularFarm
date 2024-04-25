import { Component, OnInit } from '@angular/core';
import { Personal } from '../../models/personal';
import { Producto } from '../../models/producto';
import { Factura } from '../../models/factura';
import { Detalle } from '../../models/detalle';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { DetalleService } from '../../services/detalle.service';
import { ClienteService } from '../../services/cliente.service';
import { FacturaService } from '../../services/factura.service';
import { Observable, map, of, startWith } from 'rxjs';
import { ProductoService } from '../../services/producto.service';
import Swal from 'sweetalert2';
import { Cliente } from '../../models/cliente';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nueva-factura',
  templateUrl: './nueva-factura.component.html',
  styleUrl: './nueva-factura.component.css'
})

  export class NuevaFacturaComponent implements OnInit {

    myControl = new FormControl('');
    options: string[] = ['5%','10%','15%','20%','25%','30%','35%','40%','45%','50%',];
    desc:number = 0

    opcionControlproducto = new FormControl(); // autocompletado producto
    opcionControlcliente = new FormControl(); // autocompletado cliente
    opcionesFiltradasproducto: Observable<Producto[]> | undefined  // autocompletado producto    
    opcionesFiltradascliente: Observable<Cliente[]> | undefined // autocompletado cliente    
    a1:any[]=[]
    a2:any[]=[]
    cantidad_valor:string[]=[]
    sig=0
    matrizproducto:any[]=[]
    matrizdetalle:Detalle[]=[]
    matrizcliente:Cliente[]=[]
    ventas:any =[];
    public form={id_detalle:0,cantidad:0,id_producto:0,nombre:'',descripcion:'',unidad:'',peso:'',categoria:'',precio_compra:0,precio_venta:0,imagen:'',stock:0,subtotal:0};
    detalleee=[];
    fecha = new Date;
    fecha1=""+this.fecha.getFullYear()+"-"+(this.fecha.getMonth()+1)+"-"+(this.fecha.getDate());
    public formulario_factura={id:0,fecha:this.fecha1,subtotal:0,descuento:0,total:0,user_id:1,cliente_id:0}
    public info_factura:Factura={id:0,fecha:this.fecha1,subtotal:'0',descuento:'0',total:'0',user_id:'1',cliente_id:''}
    matrizinfocliente:Cliente={id:0,nombre:'',apellido:'',fecha_nacimiento:'',ci:'',correo:'',telefono:'',imagen:''}
    opcionesproducto: Producto[] = [];
    opcionescliente: Cliente[] = [];
    
    constructor(private route:Router,private toastr: ToastrService,private dialog:MatDialog,private dialogo:MatDialog,private detalle:DetalleService,private producto:ProductoService,private cliente:ClienteService,private factura:FacturaService) {}

    get id(){return this.nuevo.get('nombre_producto'); }
    get nombre(){return this.nuevo.get('descripcion'); }
    get apellido(){return this.nuevo.get('unidad'); }
    get fecha_nacimiento(){return this.nuevo.get('peso'); }
    get ci(){return this.nuevo.get('precio_venta'); }
    get correo(){return this.nuevo.get('cantidad'); }
    get telefono(){return this.nuevo.get('precio_venta'); }
    get imagen(){return this.nuevo.get('cantidad'); }

    get nombre_producto(){return this.nuevo.get('nombre_producto'); }
    get descripcion(){return this.nuevo.get('descripcion'); }
    get unidad(){return this.nuevo.get('unidad'); }
    get peso(){return this.nuevo.get('peso'); }
    get precio_venta(){return this.nuevo.get('precio_venta'); }
    get cantidad(){return this.nuevo.get('cantidad'); }
    
    get descuento(){return this.descuento_info.get('descuento'); }

    nuevo=new FormGroup({
      nombre_producto: new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]),
      descripcion: new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]),
      unidad: new FormControl('',[Validators.required]),
      peso: new FormControl('',[Validators.required, Validators.pattern(/^-?\d+$/)]),
      precio_venta: new FormControl('',[Validators.required, Validators.pattern(/^-?\d+$/)]),
      cantidad: new FormControl('',[Validators.required,Validators.min(1)]),
    })

    nuevocliente = new FormGroup({
      id: new FormControl(''),
      nombre: new FormControl('',[Validators.required]),
      apellido: new FormControl('',[Validators.required]),
      fecha_nacimiento: new FormControl('',[Validators.required]),
      ci: new FormControl('',[Validators.required]),
      correo: new FormControl('',[Validators.required]),
      telefono: new FormControl('',[Validators.required]),
      imagen: new FormControl('',[Validators.required]),
    })

    descuento_info = new FormGroup({
      descuento: new FormControl('')
    })

    type:string | null | undefined
    ngOnInit(): void {
      this.type = localStorage.getItem("access")
    if(this.type==""||this.type=="3" )
    {      
      this.toastr.warning("No tiene acceso",'Inicia sesion');
      this.route.navigate(["/home"]);
    }
      this.producto.listar().subscribe(data => {
        this.opcionesproducto = data;
        this.opcionesFiltradasproducto = this.opcionControlproducto.valueChanges.pipe(
          startWith(''),
          map(value => this._filtrarproductos(value))
        );
      });

      this.cliente.listar().subscribe(data => {
        this.opcionescliente = data;
        this.opcionesFiltradascliente = this.opcionControlcliente.valueChanges.pipe(
          startWith(''),
          map(value => this._filtrarclientes(value))
        );
      });
      
    }

    private _filtrarproductos(value: string): Producto[] {
      const filtro1 = value.toLowerCase();
      return this.opcionesproducto.filter(producto=>producto.nombre.toLowerCase().includes(filtro1));
    }
    
    private _filtrarclientes(value: string): Cliente[] {
      const filtro = value.toString().toLowerCase();//transformar el value a strign aun que ya sea string para evitar el error
      return this.opcionescliente.filter(cliente=>cliente.ci.toString().toLowerCase().includes(filtro));//transformar la informacion filtrada del autocompletado de numero ci a strings para evitar el error del tolowercase()
    }

    setear_producto(a1:any){
      this.form.id_producto=a1.id;
      this.form.descripcion=a1.descripcion;
      this.form.nombre=a1.nombre;
      this.form.cantidad=a1.stock;
      this.form.precio_compra=a1.precio_compra;
      this.form.precio_venta=a1.precio_venta;
      this.form.stock=a1.stock;
      this.form.categoria=a1.categoria_id;
      this.form.imagen=a1.imagen;
      this.form.peso=a1.peso;
      this.form.unidad=a1.unidad;
      this.nuevo.controls['descripcion'].setValue(a1.descripcion)
      this.nuevo.controls['unidad'].setValue(a1.precio_venta)
      this.nuevo.controls['peso'].setValue(a1.stock)
      this.nuevo.controls['nombre_producto'].setValue(a1.nombre)
      this.nuevo.controls['precio_venta'].setValue(a1.precio_venta)
      this.nuevo.controls['cantidad'].setValue(a1.stock)
    }

    setear_descuento(a1:any){
      let a:number
      a = parseInt(a1)
      this.desc=a*0.01
      this.formulario_factura.total=this.formulario_factura.subtotal-(this.formulario_factura.subtotal*this.desc)
      this.formulario_factura.descuento=this.desc
    }

    validarcantidad(x:any){
      if(this.form.stock<x){
        this.nuevo.get('cantidad')?.setErrors({'max':this.form.stock})
      }
    }

    carrito(){
    
    let formulario_detalle={id:0,producto_id:0,cantidad:0,factura_id:0};
    let formulario_producto={id:0,nombre:'',descripcion:'',unidad:'',peso:'',categoria_id:'',precio_compra:0,precio_venta:0,imagen:'',stock:0}

    formulario_detalle.cantidad=(this.cantidad?.value!= undefined)?(+(this.cantidad?.value)):0
    formulario_detalle.producto_id=this.form.id_producto

    formulario_producto.id=this.form.id_producto
    formulario_producto.nombre=this.form.nombre
    formulario_producto.descripcion=this.form.descripcion
    formulario_producto.unidad=this.form.unidad
    formulario_producto.peso=this.form.peso
    formulario_producto.categoria_id=this.form.categoria
    formulario_producto.precio_compra=this.form.precio_compra
    formulario_producto.precio_venta=this.form.precio_venta
    formulario_producto.imagen=this.form.imagen
    formulario_producto.stock=this.form.stock
    this.form.subtotal=formulario_detalle.cantidad*formulario_producto.precio_venta

    this.formulario_factura.subtotal+=this.form.subtotal
    this.formulario_factura.total=this.formulario_factura.subtotal-(this.formulario_factura.subtotal*this.desc)

    let v=[];

    v.push(this.form.id_producto)
    v.push(this.form.nombre)
    v.push(this.form.descripcion)
    v.push(this.form.peso)
    v.push(this.form.unidad)
    v.push(formulario_detalle.cantidad)
    v.push(this.form.precio_venta)
    v.push(this.form.subtotal)
    this.ventas.push(v);
    
    this.nombre_producto?.setValue('')
    this.descripcion?.setValue('')
    this.unidad?.setValue('')
    this.peso?.setValue('')
    this.precio_venta?.setValue('')
    this.cantidad?.setValue('')

    }

    realizar_venta(){
      
      let id:number=0
      let factura_id:string='0'
      for (let i = 0; i < this.ventas.length; i++) {
      let matrizinfodetalle:Detalle={id:0,producto_id:'',cantidad:'',factura_id:'0'}
      let info={id:'',stock:''}
          matrizinfodetalle.cantidad=this.ventas[i][5]
          matrizinfodetalle.producto_id=this.ventas[i][0]
          matrizinfodetalle.id=id
          matrizinfodetalle.factura_id=factura_id
          info.id=matrizinfodetalle.producto_id
          info.stock=matrizinfodetalle.cantidad
          this.matrizdetalle.push(matrizinfodetalle)
          this.matrizproducto.push(info)
      }
      this.formulario_factura.cliente_id=this.matrizinfocliente.id
      this.info_factura.subtotal=this.formulario_factura.subtotal.toString()
      this.info_factura.descuento=this.formulario_factura.descuento.toString()
      this.info_factura.total=this.formulario_factura.total.toString()
      this.info_factura.cliente_id=this.formulario_factura.cliente_id.toString()

      Swal.fire({
        title: 'Esta seguro de que quiere realizar la venta?',
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'Si, agregar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.value) {
          // guardar la factura
          //recuperando id de factura y añadiendo los detalles
          //actualizar los stocks de los productos

          this.factura.agregar(this.info_factura).subscribe(data=>{
            for (let i = 0; i < this.matrizdetalle.length; i++) {
              let a:Detalle={id:0,producto_id:'',cantidad:'',factura_id:''}
              a.factura_id=data.toString()
              a.producto_id=this.matrizdetalle[i].producto_id
              a.cantidad=this.matrizdetalle[i].cantidad
              this.detalle.agregar(a).subscribe(data=>{})
              }
          })

          for (let i = 0; i < this.matrizproducto.length; i++) {

            //recuperar los productos que que conocemos su id en matriz producto

            this.producto.mostrar(this.matrizproducto[i].id).subscribe(data=>{
            let a:Producto={id:0,nombre:'',descripcion:'',unidad:'',peso:'',categoria_id:'',precio_compra:'',precio_venta:'',imagen:'',stock:''}
            let nuevostock=0
            a=data
            nuevostock=parseInt(data.stock)-this.matrizproducto[i].stock
            a.stock=nuevostock.toString()
            this.producto.actualizar(a,a.id).subscribe(data=>{})
            })
            }            

            Swal.fire({
              title: 'Venta registrada con exito!',
              icon: 'success',
              showCancelButton: true,
              confirmButtonText: 'Continuar'
            }).then((result) => {if (result.value) {location.reload();
              this.toastr.success("Venta Realizada","Exito"); }});
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire('Cancelado', 'Ocurrio un error', 'error');
        }
      });

  }

    eliminar(pos:any){
      Swal.fire({
        title: 'Esta seguro que quieres eliminar este registro de la venta?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Eliminar.',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.value) {
          this.formulario_factura.subtotal-=this.ventas[pos][7]
          this.ventas.splice(pos,1);
          this.toastr.warning('Item Removido')
          this.formulario_factura.total=this.formulario_factura.subtotal-(this.formulario_factura.subtotal*this.desc)
          Swal.fire('Eliminado!', 'El producto a sido eliminado exitosamente de la venta', 'success');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire('Cancelado', 'No se elimino el registro', 'error');
        }
      });
    }

    setear_cliente(c:any){
      this.matrizcliente=[]
      this.matrizinfocliente.id=c.id
      this.matrizinfocliente.nombre=c.nombre
      this.matrizinfocliente.apellido=c.apellido
      this.matrizinfocliente.fecha_nacimiento=c.fecha_nacimiento
      this.matrizinfocliente.ci=c.ci
      this.matrizinfocliente.correo=c.correo
      this.matrizinfocliente.telefono=c.telefono
      this.matrizinfocliente.imagen=c.imagen
      this.nuevocliente.controls['nombre'].setValue(c.nombre)
      this.nuevocliente.controls['apellido'].setValue(c.apellido)
      this.nuevocliente.controls['ci'].setValue(c.ci)
      this.matrizcliente.push(this.matrizinfocliente)
    }

    error_nombre_producto(){
      if(this.nombre_producto?.hasError('required'))
        return "Campo Obligatorio";
      return "";
    }
    error_descripcion(){
      if(this.descripcion?.hasError('required'))
        return "Campo Obligatorio";
      return "";
    }
    error_unidad(){
      if(this.unidad?.hasError('required'))
        return "Campo Obligatorio";
      return "";
    }
    error_peso(){
      if(this.peso?.hasError('required'))
        return "Campo Obligatorio";
      return "";
    }
    error_precio_venta(){
      if(this.precio_venta?.hasError('required'))
        return "Campo Obligatorio";
      return "";
    }
    error_cantidad(){
      if(this.cantidad?.hasError('required'))
        return "Campo Obligatorio";
      if(this.cantidad?.hasError('max'))
        return "Cantidad insuficiente en almacen";
      if(this.cantidad?.hasError("min"))
        return "Cantidad Invalida"
      return "";
    }

    error_ci(){
      if(this.ci?.hasError('required'))
            return "Campo Obligatorio";
          return "";
    }
    error_nombre(){
      if(this.nombre?.hasError('required'))
            return "Campo Obligatorio";
          return "";
    }
    error_apellido(){
      if(this.apellido?.hasError('required'))
            return "Campo Obligatorio";
          return "";
    }

    limpiar(){
      location.reload();
    }

  }
  
  /* COSAS QUE ARREGLAR Y CAMBIAR
  1. Añadir el campo para el descuento CHECK-------------------------------
  2.corregir el total de la venta en la tabla CHECK-------------------------------
  3. cambiar los campos a solo lectura del formulario, para que el usuario no pueda hacer cambios y solo le muestre la informacion CHEKC-------
  4. mostrar el verdadero Nro de factura y el personal encargado de la factura en la parte superior del formulario
  5. corregir el campo del formulario del cliente, para que al momento de ingresar el cliente, 
  de la opcion de ingresar uno rapidamente con solo su nombre y ci ese momento y situarlo en el formulario posteriormente, 
  tambien crear un nuevo cliente que sea "cliente culquiera" para hacer una venta mas rapidamente sin tener que guardar los datos del cliente en si
 */
  
  