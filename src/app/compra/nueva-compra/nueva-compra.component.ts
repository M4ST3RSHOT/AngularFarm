import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { Producto } from '../../models/producto';
import { Detalle } from '../../models/detalle';
import { Factura } from '../../models/factura';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { DetalleService } from '../../services/detalle.service';
import { ProductoService } from '../../services/producto.service';
import { FacturaService } from '../../services/factura.service';
import Swal from 'sweetalert2';
import { ProveedorService } from '../../services/proveedor.service';
import { Proveedor } from '../../models/proveedor';
import { Lote } from '../../models/lote';
import { CompraService } from '../../services/compra.service';
import { Compra } from '../../models/compra';
import { table } from 'console';
import { LoteService } from '../../services/lote.service';

@Component({
  selector: 'app-nueva-compra',
  templateUrl: './nueva-compra.component.html',
  styleUrl: './nueva-compra.component.css',
})
export class NuevaCompraComponent implements OnInit {
  opcionControlproducto = new FormControl(); // autocompletado producto
  opcionControlproveedor = new FormControl(); // autocompletado proveedor
  opcionesFiltradasproducto: Observable<Producto[]> | undefined; // autocompletado producto
  opcionesFiltradasproveedor: Observable<Proveedor[]> | undefined; // autocompletado proveedor

  cantidad_valor: string[] = [];
  sig = 0;
  matrizproveedor: Proveedor[] = [];
  matrizlote: Lote[] = [];
  matrizproducto: any[] = [];
  compras: any = [];
  public form = {
    id_detalle: 0,
    cantidad: 0,
    id_producto: 0,
    nombre: '',
    codigo: '',
    descripcion: '',
    unidad: '',
    peso: '',
    categoria: '',
    precio_compra: 0,
    precio_venta: 0,
    imagen: '',
    stock: 0,
    subtotal: 0,
    fecha_venci: '',
  };
  detalleee = [];

  total: number = 0;
  subtotal: number = 0;

  fecha = new Date();
  fecha1 =
    '' +
    this.fecha.getFullYear() +
    '-' +
    (this.fecha.getMonth() + 1) +
    '-' +
    this.fecha.getDate();

  formulario_compra: Compra = {
    id: 0,
    fecha: this.fecha1,
    montototal: '0',
    proveedor_id: '0',
    user_id: '1',
  };
  matrizinfoproveedor: Proveedor = {
    id: 0,
    nombre: '',
    cinit: '',
    telefono: '',
    direccion: '',
  };
  opcionesproducto: Producto[] = [];
  opcionesproveedor: Proveedor[] = [];

  constructor(
    private lote: LoteService,
    private compra: CompraService,
    private proveedor: ProveedorService,
    private route: Router,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private dialogo: MatDialog,
    private detalle: DetalleService,
    private producto: ProductoService,
    private factura: FacturaService
  ) {}

  get id() {
    return this.nuevo.get('nombre_producto');
  }
  get nombre() {
    return this.nuevo.get('descripcion');
  }
  get codigo() {
    return this.nuevo.get('codigo');
  }
  get cinit() {
    return this.nuevo.get('cinit');
  }
  get telefono() {
    return this.nuevo.get('telefono');
  }
  get direccion() {
    return this.nuevo.get('direccion');
  }

  get nombre_producto() {
    return this.nuevo.get('nombre_producto');
  }
  get descripcion() {
    return this.nuevo.get('descripcion');
  }
  get unidad() {
    return this.nuevo.get('unidad');
  }
  get peso() {
    return this.nuevo.get('peso');
  }
  get precio_venta() {
    return this.nuevo.get('precio_venta');
  }
  get cantidad() {
    return this.nuevo.get('cantidad');
  }
  get fecha_vencimiento() {
    return this.nuevo.get('fecha_vencimiento');
  }

  nuevo = new FormGroup({
    nombre_producto: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    unidad: new FormControl('', [Validators.required]),
    codigo: new FormControl('', [Validators.required]),
    peso: new FormControl('', [Validators.required]),
    precio_venta: new FormControl('', [Validators.required]),
    cantidad: new FormControl('', [Validators.required, Validators.min(1)]),
    fecha_vencimiento: new FormControl('', [
      Validators.required,
      this.fechaMenorOIgualAFechaActual, // Validador personalizado
    ]),
  });

  nuevoproveedor = new FormGroup({
    id: new FormControl(''),
    nombre: new FormControl('', [Validators.required]),
    cinit: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required]),
    direccion: new FormControl('', [Validators.required]),
  });

  type: string | null | undefined;
  user_id: string | null | undefined;

  ngOnInit(): void {
    this.user_id = localStorage.getItem('user_id');
    this.type = localStorage.getItem('access');
    if (this.type == '' || this.type == '3') {
      this.toastr.warning('No tiene acceso', 'Inicia sesion');
      this.route.navigate(['/home']);
    }
    this.producto.listar().subscribe((data) => {
      this.opcionesproducto = data;
      this.opcionesFiltradasproducto =
        this.opcionControlproducto.valueChanges.pipe(
          startWith(''),
          map((value) => this._filtrarproductos(value))
        );
    });

    this.proveedor.listar().subscribe((data) => {
      this.opcionesproveedor = data;
      this.opcionesFiltradasproveedor =
        this.opcionControlproveedor.valueChanges.pipe(
          startWith(''),
          map((value) => this._filtrarclientes(value))
        );
    });
  }

  private _filtrarproductos(value: string): Producto[] {
    const filtro1 = value.toLowerCase();
    return this.opcionesproducto.filter((producto) =>
      producto.nombre.toLowerCase().includes(filtro1)
    );
  }

  private _filtrarclientes(value: string): Proveedor[] {
    const filtro = value.toLowerCase(); //transformar el value a strign aun que ya sea string para evitar el error
    return this.opcionesproveedor.filter((proveedor) =>
      proveedor.nombre.toLowerCase().includes(filtro)
    ); //transformar la informacion filtrada del autocompletado de numero ci a strings para evitar el error del tolowercase()
  }

  setear_producto(a1: any) {
    this.opcionControlproducto.setValue('');

    this.form.id_producto = a1.id;
    this.form.descripcion = a1.descripcion;
    this.form.nombre = a1.nombre;
    this.form.codigo = a1.codigo;
    this.form.cantidad = a1.stock;
    this.form.precio_compra = a1.precio_compra;
    this.form.precio_venta = a1.precio_venta;
    this.form.stock = a1.stock;
    this.form.categoria = a1.categoria_id;
    this.form.imagen = a1.imagen;
    this.form.peso = a1.peso;
    this.form.unidad = a1.unidad;
    this.nuevo.controls['descripcion'].setValue(a1.descripcion);
    this.nuevo.controls['codigo'].setValue(a1.codigo);
    this.nuevo.controls['unidad'].setValue(a1.unidad);
    this.nuevo.controls['peso'].setValue(a1.peso);
    this.nuevo.controls['nombre_producto'].setValue(a1.nombre);
    this.nuevo.controls['precio_venta'].setValue(a1.precio_venta);
    this.nuevo.controls['cantidad'].setValue('0');
    // this.opcionControlproducto.reset();
  }

  carrito() {
    let formulario_lote = {
      id: 0,
      stock: 0,
      fecha_expiracion: 0,
      adquiere_id: 0,
      producto_id: 0,
    };

    formulario_lote.stock =
      this.cantidad?.value != undefined ? +this.cantidad?.value : 0;
    formulario_lote.producto_id = this.form.id_producto;

    this.subtotal = formulario_lote.stock * this.form.precio_venta;

    this.total += this.subtotal;

    let v = [];

    let a = '';
    a += this.fecha_vencimiento?.value?.toString();
    let b = new Date(a);
    a = '' + b.getFullYear() + '-' + (b.getMonth() + 1) + '-' + b.getDate();

    v.push(this.form.id_producto);
    v.push(this.form.nombre);
    v.push(this.form.descripcion);
    v.push(this.form.peso);
    v.push(this.form.unidad);
    v.push(formulario_lote.stock);
    v.push(this.form.precio_venta);
    v.push(a);
    v.push(this.subtotal);

    this.compras.push(v);

    this.nombre_producto?.setValue('');
    this.descripcion?.setValue('');
    this.unidad?.setValue('');
    this.peso?.setValue('');
    this.precio_venta?.setValue('');
    this.cantidad?.setValue('');
    this.fecha_vencimiento?.setValue('');
  }

  realizar_venta() {
    let id: number = 0;
    let compra_id: string = '0';

    for (let i = 0; i < this.compras.length; i++) {
      let matrizinfolote: Lote = {
        id: 0,
        producto_id: '',
        stock: '',
        adquiere_id: '0',
        fecha_expiracion: '',
      };
      let info = { id: '', stock: '' };
      matrizinfolote.stock = this.compras[i][5];
      matrizinfolote.producto_id = this.compras[i][0];
      matrizinfolote.fecha_expiracion = this.compras[i][7];
      matrizinfolote.id = id;
      matrizinfolote.adquiere_id = compra_id;
      info.id = matrizinfolote.producto_id;
      info.stock = matrizinfolote.stock;
      this.matrizlote.push(matrizinfolote);
      this.matrizproducto.push(info);
    }

    this.formulario_compra.proveedor_id =
      this.matrizinfoproveedor.id.toString();
    this.formulario_compra.montototal = this.total.toString();

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

        this.compra.agregar(this.formulario_compra).subscribe((data) => {
          for (let i = 0; i < this.matrizlote.length; i++) {
            let a: Lote = {
              id: 0,
              stock: '',
              fecha_expiracion: '',
              adquiere_id: '',
              producto_id: '',
            };
            a.adquiere_id = data.toString();

            a.stock = this.matrizlote[i].stock;
            a.fecha_expiracion = this.matrizlote[i].fecha_expiracion;
            a.producto_id = this.matrizlote[i].producto_id;
            this.lote.agregar(a).subscribe((data) => {});
          }
        });

        for (let i = 0; i < this.matrizproducto.length; i++) {
          this.producto.mostrar(this.matrizproducto[i].id).subscribe((data) => {
            let a: Producto = {
              id: 0,
              nombre: '',
              codigo: '',
              descripcion: '',
              unidad: '',
              peso: '',
              categoria_id: '',
              precio_compra: '',
              precio_venta: '',
              imagen: '',
              stock: '',
            };
            let nuevostock = 0;
            a = data;
            nuevostock = parseInt(data.stock) + this.matrizproducto[i].stock;
            a.stock = nuevostock.toString();

            this.producto.actualizar(a, a.id).subscribe((data) => {});
          });
        }

        Swal.fire({
          title: 'Venta registrada con exito!',
          icon: 'success',
          showCancelButton: true,
          confirmButtonText: 'Continuar',
        }).then((result) => {
          if (result.value) {
            location.reload();
            this.toastr.success('Venta Realizada', 'Exito');
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado', 'Ocurrio un error', 'error');
      }
    });
  }

  eliminar(pos: any) {
    Swal.fire({
      title: 'Esta seguro que quieres eliminar este registro de la venta?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar.',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        this.total -= this.compras[pos][8];
        this.compras.splice(pos, 1);
        this.toastr.warning('Item Removido');
        Swal.fire(
          'Eliminado!',
          'El producto a sido eliminado exitosamente de la venta',
          'success'
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado', 'No se elimino el registro', 'error');
      }
    });
  }

  setear_proveedor(c: any) {
    this.opcionControlproveedor.setValue('');

    this.matrizproveedor = [];
    this.matrizinfoproveedor.id = c.id;
    this.matrizinfoproveedor.nombre = c.nombre;
    this.matrizinfoproveedor.cinit = c.cinit;
    this.matrizinfoproveedor.telefono = c.telefono;
    this.matrizinfoproveedor.direccion = c.direccion;
    this.nuevoproveedor.controls['nombre'].setValue(c.nombre);
    this.nuevoproveedor.controls['cinit'].setValue(c.cinit);
    this.nuevoproveedor.controls['telefono'].setValue(c.telefono);
    this.nuevoproveedor.controls['direccion'].setValue(c.direccion);
    this.matrizproveedor.push(this.matrizinfoproveedor);
  }

  getErrorMessage(controlName: string): string {
    const control = this.nuevo.get(controlName);
    if (!control || !control.errors) return '';

    const errors = control.errors;

    if (errors['required']) return 'Campo Obligatorio';
    if (errors['minlength'])
      return `Ingrese mínimo ${errors['minlength'].requiredLength} caracteres`;
    if (errors['maxlength'])
      return `Ingrese máximo ${errors['maxlength'].requiredLength} caracteres`;
    if (errors['fechaInvalida']) return 'La fecha debe ser mayor a la actual';
    if (errors['email']) return 'Ingrese un formato email valido';
    if (errors['pattern']) {
      if (control === this.nombre) return 'Ingrese solamente letras';
      if (control === this.telefono) return 'Ingrese solamente numeros';
    }
    return '';
  }
  getErrorMessageP(controlName: string): string {
    const control = this.nuevoproveedor.get(controlName);
    if (!control || !control.errors) return '';

    const errors = control.errors;

    if (errors['required']) return 'Campo Obligatorio';
    if (errors['minlength'])
      return `Ingrese mínimo ${errors['minlength'].requiredLength} caracteres`;
    if (errors['maxlength'])
      return `Ingrese máximo ${errors['maxlength'].requiredLength} caracteres`;
    if (errors['fechaInvalida'])
      return 'La fecha no puede ser mayor a la actual';
    if (errors['email']) return 'Ingrese un formato email valido';
    if (errors['pattern']) {
      if (control === this.nombre) return 'Ingrese solamente letras';
      if (control === this.telefono) return 'Ingrese solamente numeros';
    }
    return '';
  }

  limpiar() {
    location.reload();
  }

  fechaMenorOIgualAFechaActual(
    control: AbstractControl
  ): ValidationErrors | null {
    const fechaActual = new Date(); // Fecha actual
    const fechaInicio = new Date(control.value); // Valor ingresado en el campo

    if (isNaN(fechaInicio.getTime())) {
      return { fechaInvalida: true }; // Si la fecha no es válida (mal ingresada o vacía)
    }

    if (fechaInicio < fechaActual) {
      return { fechaInvalida: true }; // Si la fecha de inicio es mayor que la fecha actual
    }

    return null; // La fecha es válida
  }
}
