import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmergenteReporteEconomicoComponent } from './emergente-reporte-economico/emergente-reporte-economico.component';

@Component({
  selector: 'app-reporteeconomico',
  templateUrl: './reporteeconomico.component.html',
  styleUrl: './reporteeconomico.component.css',
})
export class ReporteeconomicoComponent {
  constructor(
    private route: Router,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {}

  formIngresos = new FormGroup({
    fechainicio: new FormControl('', [Validators.required]),
    fechafin: new FormControl('', [Validators.required]),
  });
  formEgresos = new FormGroup({
    fechainicio: new FormControl('', [Validators.required]),
    fechafin: new FormControl('', [Validators.required]),
  });
  formGeneral = new FormGroup({
    fechainicio: new FormControl('', [Validators.required]),
    fechafin: new FormControl('', [Validators.required]),
  });
  reportedeingresos() {
    const fecha1 = this.formIngresos.value.fechainicio;
    const fecha2 = this.formIngresos.value.fechafin;
    const dialogRef = this.dialog.open(EmergenteReporteEconomicoComponent, {
      data: {
        fecha1: fecha1,
        fecha2: fecha2,
        texto: 'REPORTE DE INGRESOS DE LA FARMACIA',
      },
    });
  }
  reportedeegresos() {
    const fecha1 = this.formEgresos.value.fechainicio;
    const fecha2 = this.formEgresos.value.fechafin;
    const dialogRef = this.dialog.open(EmergenteReporteEconomicoComponent, {
      data: {
        fecha1: fecha1,
        fecha2: fecha2,
        texto: 'REPORTE DE EGRESOS DE LA FARMACIA',
      },
    });
  }
  reportegeneral() {
    const fecha1 = this.formGeneral.value.fechainicio;
    const fecha2 = this.formGeneral.value.fechafin;
    const dialogRef = this.dialog.open(EmergenteReporteEconomicoComponent, {
      data: {
        fecha1: fecha1,
        fecha2: fecha2,
        texto: 'REPORTE GENERAL ECONOMICO DE LA FARMACIA',
      },
    });
  }

  getErrorMessage(formGroup: FormGroup, controlName: string): string {
    const control = formGroup.get(controlName);
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
