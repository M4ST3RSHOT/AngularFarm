import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompraComponent } from '../compra.component';
import { CompraService } from '../../services/compra.service';
import { Personal } from '../../models/personal';
import { Compra } from '../../models/compra';
import { Proveedor } from '../../models/proveedor';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-detallar-compra',
  templateUrl: './detallar-compra.component.html',
  styleUrl: './detallar-compra.component.css',
})
export class DetallarCompraComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CompraComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private compraserv: CompraService
  ) {}

  infousuario: any = [];
  infoadquiere: any = [];
  infolote: any = [];
  infoproveedor: any = [];

  ngOnInit(): void {
    this.compraserv.detallarpdf(this.data.id).subscribe((data: any) => {
      console.log(data);
      this.infoproveedor = data.consulta_proveedor[0];
      for (let i = 0; i < data.consulta_lote.length; i++) {
        this.infolote[i] = data.consulta_lote[i];
      }
      this.infoadquiere = data.consulta_adquiere[0];
      this.infousuario = data.consulta_usuario[0];
    });
  }

  generarPdf() {
    const cuerpolote = this.infolote.map((item: any) => [
      item.nombre,
      item.codigo,
      item.descripcion,
      item.unidad,
      item.peso,
      item.precio_compra,
      item.precio_venta,
      item.cantidad,
      (item.subtotalproducto = item.cantidad * item.precio_compra),
    ]);

    const doc = new jsPDF();

    const logoBase64 = 'assets/images/logopdf.jpg'; // Cambia '...' por el base64 del logo
    doc.addImage(logoBase64, 'JPEG', 20, 10, 20, 20);

    doc.setFontSize(18);
    doc.text('Detalle de compra SUPERFARMA', 14, 35);

    doc.setFontSize(12);
    const fecha = new Date(this.infoadquiere.fecha);
    const fechamostrar =
      'Fecha de emisión: ' +
      fecha.getDate() +
      '/' +
      (fecha.getMonth() + 1) + // Sumamos 1 para obtener el mes correcto
      '/' +
      fecha.getFullYear();

    doc.text(fechamostrar, 14, 45);

    const factura = 'Número de compra: ' + this.infoadquiere.id;
    doc.text(factura, 114, 45);

    const usuario =
      'Usuario : ' + this.infousuario.nombre + ' ' + this.infousuario.apellido;
    doc.text(usuario, 14, 65);

    const cliente =
      'Proveedor: ' +
      this.infoproveedor.nombre +
      '  Telefono: ' +
      this.infoproveedor.telefono +
      '  CI/NIT: ' +
      this.infoproveedor.cinit;
    doc.text(cliente, 14, 55);

    const monto = 'Total: ' + this.infoadquiere.montototal + ' Bs.-';
    doc.text(monto, 14, 75);

    (doc as any).autoTable({
      head: [
        [
          'Nombre',
          'Codigo',
          'Descripcion',
          'Unidad',
          'Peso',
          'Precio de compra',
          'Precio de venta',
          'Cantidad',
          'Subtotal',
        ],
      ],
      body: cuerpolote,
      startY: 80,
      theme: 'grid',
    });

    doc.save(
      'compra N_' +
        this.infoadquiere.id +
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
