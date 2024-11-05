import { Component, OnInit, ViewChild } from '@angular/core';
import { FacturaService } from '../services/factura.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../environments/environments.prod';
import { Factura } from '../models/factura';
import { Personal } from '../models/personal';
import { Producto } from '../models/producto';
import { Detalle } from '../models/detalle';
import Swal from 'sweetalert2';
import { NuevaFacturaComponent } from './nueva-factura/nueva-factura.component';
import { Router } from '@angular/router';
import { identifierName } from '@angular/compiler';
import { DetallarCompraComponent } from '../compra/detallar-compra/detallar-compra.component';
import { DetallarFacturaComponent } from './detallar-factura/detallar-factura.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { subscribe } from 'node:diagnostics_channel';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrl: './factura.component.css',
})
export class FacturaComponent implements OnInit {
  constructor(
    private route: Router,
    private facturaserv: FacturaService,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private router: Router
  ) {}
  base = environment.base;
  factura: any[] = [];
  a1: number = 0;

  type: string | null | undefined;
  ngOnInit(): void {
    this.type = localStorage.getItem('access');
    if (this.type == '' || this.type == '3') {
      this.toastr.warning('No tiene acceso', 'Inicia sesion');
      this.route.navigate(['/home']);
    }
    this.facturaserv.listar().subscribe((data) => {
      this.factura = data;
      this.dataSource = new MatTableDataSource(this.factura);
      this.dataSource.paginator = this.paginator;
    });
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  displayedColumns: string[] = [
    'id',
    'fecha',
    'subtotal',
    'descuento',
    'total',
    'personal',
    'cliente',
    'ci',
    'opcion',
  ];
  dataSource!: MatTableDataSource<any>;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator = this.paginator;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  nueva_factura(): void {
    this.router.navigate(['/crear-venta']);
  }

  actualizar_factura(item: Factura): void {
    this.a1 = item.id;
    this.router.navigate(['/actualizar-venta', this.a1]);
  }

  eliminar(item: Factura) {}

  detallarventa(item: any) {
    let a: number;
    a = item.idfactura;
    const dialogRef = this.dialog.open(DetallarFacturaComponent, {
      data: {
        id: a,
      },
    });
  }
}
