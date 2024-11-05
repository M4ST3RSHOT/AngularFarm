import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReportecomprasComponent } from './reportecompras/reportecompras.component';
import { MatDialog } from '@angular/material/dialog';
import { ReporteinventarioComponent } from './reporteinventario/reporteinventario.component';
import { ReporteventasComponent } from './reporteventas/reporteventas.component';
import { ReporteeconomicoComponent } from './reporteeconomico/reporteeconomico.component';
import { ReporteventasusuarioComponent } from './reporteventasusuario/reporteventasusuario.component';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.css',
})
export class ReporteComponent implements OnInit {
  constructor(
    private route: Router,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {}
  type: string | null | undefined;
  ngOnInit() {
    this.type = localStorage.getItem('access');
    if (this.type == '' || this.type == '2') {
      this.toastr.warning('No tiene acceso', 'Inicia sesion');
      this.route.navigate(['/home']);
    }
  }
  reportecompras() {
    const dialogRef = this.dialog.open(ReportecomprasComponent);
  }
  reporteinventario() {
    const dialogRef = this.dialog.open(ReporteinventarioComponent);
  }
  reporteventas() {
    const dialogRef = this.dialog.open(ReporteventasComponent);
  }
  reporteeconomico() {
    const dialogRef = this.dialog.open(ReporteeconomicoComponent);
  }
}
