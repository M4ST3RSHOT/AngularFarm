import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReporteeconomicoComponent } from '../reporteeconomico.component';
import { CompraService } from '../../../services/compra.service';
import jsPDF from 'jspdf';

import 'jspdf-autotable';
import { FacturaService } from '../../../services/factura.service';

@Component({
  selector: 'app-emergente-reporte-economico',
  templateUrl: './emergente-reporte-economico.component.html',
  styleUrl: './emergente-reporte-economico.component.css',
})
export class EmergenteReporteEconomicoComponent {
  constructor(
    public dialogRef: MatDialogRef<ReporteeconomicoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private compraserv: CompraService,
    private facturaserv: FacturaService
  ) {}
  datosingresos: any = [];
  datosegresos: any = [];
  datosgeneral: any = [];
  ingresos_subtotal: any = [];
  ingresos_total: any = [];
  egresos_total: any = [];
  ngOnInit(): void {
    switch (this.data.texto) {
      case 'REPORTE DE INGRESOS DE LA FARMACIA':
        this.facturaserv
          .reporteingresos(
            this.data.fecha1.getDate(),
            this.data.fecha1.getMonth() + 1,
            this.data.fecha1.getFullYear(),
            this.data.fecha2.getDate(),
            this.data.fecha2.getMonth() + 1,
            this.data.fecha2.getFullYear()
          )
          .subscribe((data: any) => {
            this.datosingresos = data.reporte_ingresos;
            this.ingresos_subtotal = data.ganancia_total[0].subtotal;
            this.ingresos_total = data.ganancia_total[0].total;
            // Ordenar los datos por fecha de expiración
            this.datosingresos.sort((a: any, b: any) => {
              return new Date(a.fecha).getTime() - new Date(b.fecha).getTime();
            });
          });
        break;
      case 'REPORTE DE EGRESOS DE LA FARMACIA':
        this.compraserv
          .reporteegresos(
            this.data.fecha1.getDate(),
            this.data.fecha1.getMonth() + 1,
            this.data.fecha1.getFullYear(),
            this.data.fecha2.getDate(),
            this.data.fecha2.getMonth() + 1,
            this.data.fecha2.getFullYear()
          )
          .subscribe((data: any) => {
            this.datosegresos = data.reporte_egresos;
            this.egresos_total = data.ganancia_total[0].montototal;
            // Ordenar los datos por fecha de expiración
            this.datosegresos.sort((a: any, b: any) => {
              return new Date(a.fecha).getTime() - new Date(b.fecha).getTime();
            });
          });
        break;

      case 'REPORTE GENERAL ECONOMICO DE LA FARMACIA':
        this.facturaserv
          .reporteeconomicogeneral(
            this.data.fecha1.getDate(),
            this.data.fecha1.getMonth() + 1,
            this.data.fecha1.getFullYear(),
            this.data.fecha2.getDate(),
            this.data.fecha2.getMonth() + 1,
            this.data.fecha2.getFullYear()
          )
          .subscribe((data: any) => {
            this.datosingresos = data.reporte_ingresos;

            this.datosegresos = data.reporte_egresos;

            this.ingresos_subtotal = data.ganancia_total_ingresos[0].subtotal;
            this.ingresos_total = data.ganancia_total_ingresos[0].total;

            this.egresos_total = data.ganancia_total_egresos[0].montototal;

            // Ordenar los datos por fecha de expiración
            this.datosingresos.sort((a: any, b: any) => {
              return new Date(a.fecha).getTime() - new Date(b.fecha).getTime();
            });
            this.datosegresos.sort((a: any, b: any) => {
              return new Date(a.fecha).getTime() - new Date(b.fecha).getTime();
            });
          });
        break;

      default:
        break;
    }
  }

  generarPDFingresos() {
    const cuerpoingresos = this.datosingresos.map((item: any) => [
      item.id,
      item.fecha,
      item.usuario,
      item.producto,
      item.cantidad,
      item.subtotal,
      item.descuento,
      item.total,
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

    const subtotal =
      'Ganancia Subtotal de la farmacia :' + this.ingresos_subtotal + 'Bs.-';
    doc.text(subtotal, 14, 55);

    const total =
      'Ganancia total de la farmacia contando con los descuentos :' +
      this.ingresos_total +
      'Bs.-';
    doc.text(total, 14, 60);

    // Generar la tabla
    (doc as any).autoTable({
      head: [
        [
          'Id',
          'Fecha',
          'Usuario',
          'Producto',
          'Cantidad',
          'Subtotal',
          'Descuento',
          'Total',
        ],
      ],
      body: cuerpoingresos,
      startY: 65,
      theme: 'grid',
    });
    // Descargar el PDF
    doc.save(this.data.texto + '.pdf');
  }
  generarPDFegresos() {
    const cuerpoegresos = this.datosegresos.map((item: any) => [
      item.id,
      item.fecha,
      item.usuario,
      item.proveedor,
      item.producto,
      item.stock,
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

    const total =
      'Total de egresos de la farmacia  :' + this.egresos_total + 'Bs.-';
    doc.text(total, 14, 55);

    // Generar la tabla
    (doc as any).autoTable({
      head: [
        [
          'Id',
          'Fecha',
          'Usuario',
          'Proveedor',
          'Producto',
          'Stock',
          'Monto total',
        ],
      ],
      body: cuerpoegresos,
      startY: 60,
      theme: 'grid',
    });
    // Descargar el PDF
    doc.save(this.data.texto + '.pdf');
  }
  generarPDFgeneral() {
    const cuerpoingresos = this.datosingresos.map((item: any) => [
      item.id,
      item.fecha,
      item.usuario,
      item.producto,
      item.cantidad,
      item.subtotal,
      item.descuento,
      item.total,
    ]);

    const cuerpoegresos = this.datosegresos.map((item: any) => [
      item.id,
      item.fecha,
      item.usuario,
      item.proveedor,
      item.producto,
      item.stock,
      item.montototal,
    ]);

    const doc = new jsPDF();

    // Agregar logo
    const logoBase64 = 'assets/images/logopdf.jpg'; // Cambia '...' por el base64 del logo
    doc.addImage(logoBase64, 'JPEG', 20, 5, 20, 20);

    // Título
    doc.setFontSize(18);
    doc.text(this.data.texto, 14, 35);

    // Descripción debajo del título
    doc.setFontSize(12);
    const descripcion =
      'Tomando datos desde el: ' +
      this.fechaATexto(this.data.fecha1) +
      ' al ' +
      this.fechaATexto(this.data.fecha2);
    doc.text(descripcion, 14, 45);

    const subtotal =
      'Ganancia Subtotal de la farmacia :' + this.ingresos_subtotal + 'Bs.-';
    doc.text(subtotal, 14, 55);

    const totalingresos =
      'Ganancia total de la farmacia contando con los descuentos :' +
      this.ingresos_total +
      'Bs.-';
    doc.text(totalingresos, 14, 60);

    const totalegresos =
      'Total de egresos de la farmacia  :' + this.egresos_total + 'Bs.-';
    doc.text(totalegresos, 14, 70);

    const liquido =
      'Total liquido :' + (this.ingresos_total - this.egresos_total) + 'Bs.-';
    doc.text(liquido, 14, 80);

    doc.setFontSize(18);
    const nombretabla1 = 'Tabla de ingresos';
    doc.text(nombretabla1, 14, 90);

    (doc as any).autoTable({
      head: [
        [
          'Id',
          'Fecha',
          'Usuario',
          'Producto',
          'Cantidad',
          'Subtotal',
          'Descuento',
          'Total',
        ],
      ],
      body: cuerpoingresos,
      startY: 95,
      theme: 'grid',
    });

    doc.addPage();

    doc.setFontSize(18);
    const nombretabla2 = 'Tabla de egresos';
    doc.text(nombretabla2, 14, 20);

    (doc as any).autoTable({
      head: [
        [
          'Id',
          'Fecha',
          'Usuario',
          'Proveedor',
          'Producto',
          'Stock',
          'Monto total',
        ],
      ],
      body: cuerpoegresos,
      startY: 25,
      theme: 'grid',
    });

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
