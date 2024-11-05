import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ImprimirService } from '../../services/imprimir.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { EmergenteReporteComprasComponent } from './emergente-reporte-compras/emergente-reporte-compras.component';

@Component({
  selector: 'app-reportecompras',
  templateUrl: './reportecompras.component.html',
  styleUrl: './reportecompras.component.css',
})
export class ReportecomprasComponent {
  constructor(
    private route: Router,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {}
  agregar = new FormGroup({
    fechainicio: new FormControl('', [Validators.required]),
    fechafin: new FormControl('', [Validators.required]),
  });
  reporte1() {
    const fecha1 = new Date();
    const fecha2 = new Date(fecha1);
    fecha2.setMonth(fecha2.getMonth() - 1);
    const dialogRef = this.dialog.open(EmergenteReporteComprasComponent, {
      data: {
        fecha1: fecha1,
        fecha2: fecha2,
        texto: 'REPORTE DE COMPRAS REALIZADAS EN EL MES',
      },
    });
  }
  reporte2() {
    const fecha1 = new Date();
    const fecha2 = new Date(fecha1);
    fecha2.setDate(fecha2.getDate() - 7);
    const dialogRef = this.dialog.open(EmergenteReporteComprasComponent, {
      data: {
        fecha1: fecha1,
        fecha2: fecha2,
        texto: 'REPORTE DE COMPRAS REALIZADAS EN LA SEMANA',
      },
    });
  }
  reporte3() {
    const fecha1 = this.agregar.value.fechainicio;
    const fecha2 = this.agregar.value.fechafin;
    const dialogRef = this.dialog.open(EmergenteReporteComprasComponent, {
      data: {
        fecha1: fecha1,
        fecha2: fecha2,
        texto: 'REPORTE PERSONALIZADO DE COMPRAS',
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
