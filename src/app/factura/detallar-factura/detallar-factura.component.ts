import { Component, Inject, OnInit } from '@angular/core';
import { FacturaComponent } from '../factura.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FacturaService } from '../../services/factura.service';
import { Factura } from '../../models/factura';
import { Personal } from '../../models/personal';
import { Cliente } from '../../models/cliente';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-detallar-factura',
  templateUrl: './detallar-factura.component.html',
  styleUrl: './detallar-factura.component.css',
})
export class DetallarFacturaComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<FacturaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private facturaserv: FacturaService
  ) {}

  infousuario: any = [];
  infofactura: any = [];
  infodetalle: any = [];
  infocliente: any = [];

  ngOnInit(): void {
    this.facturaserv.detallarpdf(this.data.id).subscribe((data: any) => {
      this.infocliente = data.consulta_cliente[0];
      for (let i = 0; i < data.consulta_detalle.length; i++) {
        this.infodetalle[i] = data.consulta_detalle[i];
      }
      this.infofactura = data.consulta_factura[0];
      this.infousuario = data.consulta_usuario[0];
      console.log(this.infodetalle);
    });
  }

  generarPdf() {
    const cuerpodetalle = this.infodetalle.map((item: any) => [
      item.nombre,
      item.codigo,
      item.descripcion,
      item.precio_venta,
      item.unidad,
      item.peso,
      item.cantidad,
      (item.subtotalproducto = item.cantidad * item.precio_venta),
    ]);

    const doc = new jsPDF();

    const logoBase64 = 'assets/images/logopdf.jpg'; // Cambia '...' por el base64 del logo
    doc.addImage(logoBase64, 'JPEG', 20, 10, 20, 20);

    doc.setFontSize(18);
    doc.text('Factura de venta SUPERFARMA', 14, 35);

    doc.setFontSize(12);
    const fecha = new Date(this.infofactura.fecha);
    const fechamostrar =
      'Fecha de emisión: ' +
      fecha.getDate() +
      '/' +
      (fecha.getMonth() + 1) + // Sumamos 1 para obtener el mes correcto
      '/' +
      fecha.getFullYear();

    doc.text(fechamostrar, 14, 45);

    const factura = 'Número de factura: ' + this.infofactura.id;
    doc.text(factura, 114, 45);

    const usuario =
      'Usuario : ' + this.infousuario.nombre + ' ' + this.infousuario.apellido;
    doc.text(usuario, 14, 55);

    const cliente =
      'Cliente: ' +
      this.infocliente.nombre +
      ' ' +
      this.infocliente.apellido +
      ' CI: ' +
      this.infocliente.ci;
    doc.text(cliente, 114, 55);

    const monto =
      'Subtotal : ' +
      this.infofactura.subtotal +
      ' Bs.-   Descuento: ' +
      this.infofactura.descuento +
      ' %   Total: ' +
      this.infofactura.total +
      ' Bs.-';
    doc.text(monto, 14, 65);

    (doc as any).autoTable({
      head: [
        [
          'Nombre',
          'Codigo',
          'Descripcion',
          'Precio',
          'Unidad',
          'Peso',
          'Cantidad',
          'Subtotal',
        ],
      ],
      body: cuerpodetalle,
      startY: 70,
      theme: 'grid',
    });

    doc.save(
      'factura N_' +
        this.infofactura.id +
        ' ' +
        fecha.getDate() +
        '_' +
        (fecha.getMonth() + 1) +
        '_' +
        fecha.getFullYear() +
        '.pdf'
    );
  }
}
