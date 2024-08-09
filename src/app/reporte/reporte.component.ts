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
  styleUrl: './reporte.component.css'
})
export class ReporteComponent implements OnInit{
  constructor(private route:Router,private toastr:ToastrService,public dialog: MatDialog,){}
  type:string | null | undefined
  ngOnInit(){
    this.type = localStorage.getItem("access")
    if(this.type=="" ||this.type=="2" )
    {      
      this.toastr.warning("No tiene acceso",'Inicia sesion');
      this.route.navigate(["/home"]);
    }
  }
  reportecompras(){
      const dialogRef = this.dialog.open(ReportecomprasComponent);
      dialogRef.afterClosed().subscribe(result => {
        this.toastr.success("Reporte",'reporte de compras');
        });
  }
  reporteinventario(){
    const dialogRef = this.dialog.open(ReporteinventarioComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.toastr.success("Reporte",'reporte de inventario');
      });
    
  }
  reporteventas(){
    const dialogRef = this.dialog.open(ReporteventasComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.toastr.success("Reporte",'reporte de ventas');
      });
    
  }
  reporteeconomico(){
    const dialogRef = this.dialog.open(ReporteeconomicoComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.toastr.success("Reporte",'reporte economico');
      });
    
  }
  reporteventasusuario(){
    const dialogRef = this.dialog.open(ReporteventasusuarioComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.toastr.success("Reporte",'reporte de ventas por usuario');
      });
    
  }
}
