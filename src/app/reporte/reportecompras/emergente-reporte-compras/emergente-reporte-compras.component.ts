import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import jsPDF from 'jspdf';
import { ReportecomprasComponent } from '../reportecompras.component';
import { ProductoService } from '../../../services/producto.service';
import { CompraService } from '../../../services/compra.service';

import 'jspdf-autotable';

@Component({
  selector: 'app-emergente-reporte-compras',
  templateUrl: './emergente-reporte-compras.component.html',
  styleUrl: './emergente-reporte-compras.component.css',
})
export class EmergenteReporteComprasComponent {
  constructor(
    public dialogRef: MatDialogRef<ReportecomprasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private compraserv: CompraService
  ) {}
  datos: any = [];
  ngOnInit(): void {
    switch (this.data.texto) {
      case 'REPORTE DE COMPRAS REALIZADAS EN EL MES':
        this.compraserv
          .reporte(
            this.data.fecha2.getDate(),
            this.data.fecha2.getMonth() + 1,
            this.data.fecha2.getFullYear(),
            this.data.fecha1.getDate(),
            this.data.fecha1.getMonth() + 1,
            this.data.fecha1.getFullYear()
          )
          .subscribe((data: any) => {
            this.datos = data;
            this.datos.sort((a: any, b: any) => {
              return new Date(a.fecha).getTime() - new Date(b.fecha).getTime();
            });
          });
        break;
      case 'REPORTE DE COMPRAS REALIZADAS EN LA SEMANA':
        this.compraserv
          .reporte(
            this.data.fecha2.getDate(),
            this.data.fecha2.getMonth() + 1,
            this.data.fecha2.getFullYear(),
            this.data.fecha1.getDate(),
            this.data.fecha1.getMonth() + 1,
            this.data.fecha1.getFullYear()
          )
          .subscribe((data: any) => {
            this.datos = data;
            this.datos.sort((a: any, b: any) => {
              return new Date(a.fecha).getTime() - new Date(b.fecha).getTime();
            });
          });
        break;

      case 'REPORTE PERSONALIZADO DE COMPRAS':
        this.compraserv
          .reporte(
            this.data.fecha1.getDate(),
            this.data.fecha1.getMonth() + 1,
            this.data.fecha1.getFullYear(),
            this.data.fecha2.getDate(),
            this.data.fecha2.getMonth() + 1,
            this.data.fecha2.getFullYear()
          )
          .subscribe((data: any) => {
            this.datos = data;
            // Ordenar los datos por fecha de expiración
            this.datos.sort((a: any, b: any) => {
              return new Date(a.fecha).getTime() - new Date(b.fecha).getTime();
            });
          });
        break;

      default:
        break;
    }
  }
  generarPDF() {
    console.log(this.datos);
    const cuerpoVencidos = this.datos.map((item: any) => [
      item.id,
      item.fecha,
      item.proveedor,
      item.usuario,
      item.producto,
      item.stock,
      item.fecha_expiracion,
      item.montototal,
    ]);

    const doc = new jsPDF();

    // Agregar logo
    const logoBase64 = 'assets/images/logopdf.jpg'; // Cambia '...' por el base64 del logo
    doc.addImage(logoBase64, 'JPEG', 20, 10, 20, 20);

    // Título
    doc.setFontSize(18);
    doc.text(this.data.texto, 14, 40);

    // Descripción debajo del título
    doc.setFontSize(12);
    const descripcion =
      'Tomando datos desde el: ' +
      this.fechaATexto(this.data.fecha1) +
      ' al ' +
      this.fechaATexto(this.data.fecha2);
    doc.text(descripcion, 14, 50);

    // Generar la tabla
    (doc as any).autoTable({
      head: [
        [
          'Id',
          'Fecha',
          'Proveedor',
          'Usuario',
          'Producto',
          'Stock',
          'Fecha de expiracion',
          'Monto total',
        ],
      ],
      body: cuerpoVencidos,
      startY: 55,
      theme: 'grid',
      didParseCell: (data: any) => {
        if (data.column.index === 8) {
          // Índice de `fecha_expiracion`
          const fechaActual = new Date();
          const fechaExpiracion = new Date(data.cell.raw);
          const diferenciaDias = Math.floor(
            (fechaExpiracion.getTime() - fechaActual.getTime()) /
              (1000 * 60 * 60 * 24)
          );
          // Color de fondo según la diferencia en días
          if (diferenciaDias <= 7) {
            data.cell.styles.fillColor = [255, 0, 0]; // Rojo
          } else if (diferenciaDias <= 180) {
            data.cell.styles.fillColor = [255, 255, 0]; // Amarillo
          } else {
            data.cell.styles.fillColor = [0, 255, 0]; // Verde
          }
        }
      },
    });
    // Descargar el PDF
    doc.save(this.data.texto + '.pdf');
  }

  fechaATexto(fechaString: string): string {
    const meses = [
      'enero',
      'febrero',
      'marzo',
      'abril',
      'mayo',
      'junio',
      'julio',
      'agosto',
      'septiembre',
      'octubre',
      'noviembre',
      'diciembre',
    ];

    const fecha = new Date(fechaString);
    const dia = fecha.getDate();
    const mes = fecha.getMonth(); // Los meses en JavaScript son de 0 a 11
    const gestion = fecha.getFullYear();

    return `${dia} de ${meses[mes]} de ${gestion}`;
  }
  fechanumero(fechaString: string): string {
    const fecha = new Date(fechaString);
    const dia = fecha.getDate();
    const mes = fecha.getMonth(); // Los meses en JavaScript son de 0 a 11
    const gestion = fecha.getFullYear();

    return `${dia} de ${mes} de ${gestion}`;
  }
}
