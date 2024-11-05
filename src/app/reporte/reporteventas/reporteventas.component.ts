import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmergenteReporteVentasComponent } from './emergente-reporte-ventas/emergente-reporte-ventas.component';
import { ClienteService } from '../../services/cliente.service';
import { PersonalService } from '../../services/personal.service';

@Component({
  selector: 'app-reporteventas',
  templateUrl: './reporteventas.component.html',
  styleUrl: './reporteventas.component.css',
})
export class ReporteventasComponent implements OnInit {
  constructor(
    private route: Router,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private userserv: PersonalService
  ) {}
  agregar = new FormGroup({
    fechainicio: new FormControl('', [Validators.required]),
    fechafin: new FormControl('', [Validators.required]),
  });
  ventascliente = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    ci: new FormControl('', [Validators.required]),
    fechainicio1: new FormControl('', [Validators.required]),
    fechafin1: new FormControl('', [Validators.required]),
  });
  infocliente: any = [];
  matrizinfousuario: any = [];
  ngOnInit(): void {
    this.userserv.listar().subscribe((data) => {
      this.infocliente = data;
    });
  }
  setear_cliente(usuario: any) {
    // this.opcionControlcliente.setValue('');
    this.ventascliente.controls['nombre'].setValue(usuario.nombre);
    this.ventascliente.controls['ci'].setValue(usuario.ci);
    this.matrizinfousuario.push(usuario);
  }
  reporte1() {
    const fecha1 = new Date();
    const fecha2 = new Date(fecha1);
    fecha2.setMonth(fecha2.getMonth() - 1);
    const dialogRef = this.dialog.open(EmergenteReporteVentasComponent, {
      data: {
        fecha1: fecha1,
        fecha2: fecha2,
        texto: 'REPORTE DE VENTAS REALIZADAS EN EL MES',
      },
    });
  }
  reporte2() {
    const fecha1 = new Date();
    const fecha2 = new Date(fecha1);
    fecha2.setDate(fecha2.getDate() - 7);
    const dialogRef = this.dialog.open(EmergenteReporteVentasComponent, {
      data: {
        fecha1: fecha1,
        fecha2: fecha2,
        texto: 'REPORTE DE VENTAS REALIZADAS EN LA SEMANA',
      },
    });
  }
  reporte3() {
    const fecha1 = this.agregar.value.fechainicio;
    const fecha2 = this.agregar.value.fechafin;
    const dialogRef = this.dialog.open(EmergenteReporteVentasComponent, {
      data: {
        fecha1: fecha1,
        fecha2: fecha2,
        texto: 'REPORTE PERSONALIZADO DE VENTAS',
      },
    });
  }

  reporteUsuario() {
    const fecha1 = this.ventascliente.value.fechainicio1;
    const fecha2 = this.ventascliente.value.fechafin1;
    const nombre = this.ventascliente.value.nombre;
    const ci = this.ventascliente.value.ci;
    const dialogRef = this.dialog.open(EmergenteReporteVentasComponent, {
      data: {
        fecha1: fecha1,
        fecha2: fecha2,
        nombre: nombre,
        ci: ci,
        texto: 'REPORTE DE VENTAS POR USUARIO',
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
  trackByOption(index: number, option: any): any {
    return option ? option.id : index;
  }
}
