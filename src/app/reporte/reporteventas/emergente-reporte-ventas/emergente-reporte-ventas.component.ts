import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReporteventasComponent } from '../reporteventas.component';
import { FacturaService } from '../../../services/factura.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
@Component({
  selector: 'app-emergente-reporte-ventas',
  templateUrl: './emergente-reporte-ventas.component.html',
  styleUrl: './emergente-reporte-ventas.component.css',
})
export class EmergenteReporteVentasComponent {
  constructor(
    public dialogRef: MatDialogRef<ReporteventasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private facturaserv: FacturaService
  ) {}
  datos: any = [];
  ngOnInit(): void {
    switch (this.data.texto) {
      case 'REPORTE DE VENTAS REALIZADAS EN EL MES':
        this.facturaserv
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
      case 'REPORTE DE VENTAS REALIZADAS EN LA SEMANA':
        this.facturaserv
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

      case 'REPORTE PERSONALIZADO DE VENTAS':
        this.facturaserv
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

      case 'REPORTE DE VENTAS POR USUARIO':
        this.facturaserv
          .ventasporusuario(
            this.data.fecha1.getDate(),
            this.data.fecha1.getMonth() + 1,
            this.data.fecha1.getFullYear(),
            this.data.fecha2.getDate(),
            this.data.fecha2.getMonth() + 1,
            this.data.fecha2.getFullYear(),
            this.data.ci
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
    const cuerpodatos = this.datos.map((item: any) => [
      item.id,
      item.fecha,
      item.cliente,
      item.usuario,
      item.producto,
      item.cantidad,
      item.descuento,
      item.total,
    ]);

    const doc = new jsPDF();

    // Agregar logo
    const logoBase64 = 'assets/images/logopdf.jpg'; // Cambia '...' por el base64 del logo
    doc.addImage(logoBase64, 'JPEG', 20, 10, 20, 20);

    // Título
    doc.setFontSize(15);
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
          'Cliente',
          'Usuario',
          'Producto',
          'cantidad',
          'Descuento',
          'Total',
        ],
      ],
      body: cuerpodatos,
      startY: 55,
      theme: 'grid',
    });
    // Descargar el PDF
    doc.save(this.data.texto + '.pdf');
  }

  ventasporusuarioPDF() {
    {
      console.log(this.datos);
      const cuerpodatos = this.datos.map((item: any) => [
        item.id,
        item.usuario,
        item.ci,
        item.fecha,
        item.nombre,
        item.descuento,
        item.total,
      ]);

      const doc = new jsPDF();

      // Agregar logo
      const logoBase64 = 'assets/images/logopdf.jpg'; // Cambia '...' por el base64 del logo
      doc.addImage(logoBase64, 'JPEG', 20, 10, 20, 20);

      // Título
      doc.setFontSize(18);
      doc.text(this.data.texto + ' para el usuario ' + this.data.ci, 14, 40);

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
            'Usuario',
            'CI',
            'Fecha de venta',
            'Producto',
            'Descuento',
            'Total',
          ],
        ],
        body: cuerpodatos,
        startY: 55,
        theme: 'grid',
      });
      // Descargar el PDF
      doc.save(this.data.texto + '.pdf');
    }
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
