import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';
import { EmergenteReporteInventarioComponent } from './emergente-reporte-inventario/emergente-reporte-inventario.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-reporteinventario',
  templateUrl: './reporteinventario.component.html',
  styleUrl: './reporteinventario.component.css',
})
export class ReporteinventarioComponent implements OnInit {
  constructor(
    private productoserv: ProductoService,
    private route: Router,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {}
  agregar = new FormGroup({
    producto: new FormControl('', [Validators.required]),
    codigo: new FormControl('', [Validators.required]),
    fechainicio: new FormControl('', [Validators.required]),
    fechafin: new FormControl('', [Validators.required]),
  });
  get nombre() {
    return this.agregar.get('producto');
  }
  get codigo() {
    return this.agregar.get('codigo');
  }
  productos: Producto[] = [];
  matrizinfoproducto: Producto[] = [];
  ngOnInit(): void {
    this.productoserv.listar().subscribe((data) => {
      this.productos = data;
    });
  }
  setear_producto(info: Producto) {
    // this.opcionControlcliente.setValue('');
    this.agregar.controls['producto'].setValue(info.nombre);
    this.agregar.controls['codigo'].setValue(info.codigo);
    this.matrizinfoproducto.push(info);
  }
  reporte1() {
    const fecha1 = new Date();
    const fecha2 = new Date(fecha1);
    fecha2.setDate(fecha2.getFullYear() + 1);
    const dialogRef = this.dialog.open(EmergenteReporteInventarioComponent, {
      data: {
        fecha1: fecha1,
        fecha2: fecha2,
        texto: 'REPORTE DE PRODUCTOS CON FECHA DE VENCIMIENTO PROXIMA',
      },
    });
  }
  reporte2() {
    const fecha1 = new Date();
    const fecha2 = new Date(fecha1);
    fecha2.setDate(fecha2.getDate() + 7);
    const dialogRef = this.dialog.open(EmergenteReporteInventarioComponent, {
      data: {
        fecha1: fecha1,
        fecha2: fecha2,
        texto: 'REPORTE DE PRODUCTOS CON FECHA DE VENCIMIENTO DE ESTA SEMANA',
      },
    });
  }
  reporte3() {
    const fecha1 = this.agregar.value.fechainicio;
    const fecha2 = this.agregar.value.fechafin;
    const producto = this.agregar.value.producto;
    const codigo = this.agregar.value.codigo;
    const dialogRef = this.dialog.open(EmergenteReporteInventarioComponent, {
      data: {
        fecha1: fecha1,
        fecha2: fecha2,
        producto: producto,
        codigo: codigo,
        texto: 'REPORTE DE COMPRAS Y VENTAS DEL PRODUCTO',
      },
    });
  }
  reporte4() {
    const fecha1 = new Date();
    const fecha2 = new Date(fecha1);
    fecha2.setDate(fecha2.getFullYear() + 1);
    const dialogRef = this.dialog.open(EmergenteReporteInventarioComponent, {
      data: {
        fecha1: fecha1,
        fecha2: fecha2,
        texto: 'REPORTE GENERAL DE INVENTARIO',
      },
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.agregar.get(controlName);
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
    return '';
  }
}
