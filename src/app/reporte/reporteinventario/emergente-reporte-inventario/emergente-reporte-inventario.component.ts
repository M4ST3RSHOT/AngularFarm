import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReporteinventarioComponent } from '../reporteinventario.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Producto } from '../../../models/producto';
import { ProductoService } from '../../../services/producto.service';
import { subscribe } from 'diagnostics_channel';
import test from 'node:test';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-emergente-reporte-inventario',
  templateUrl: './emergente-reporte-inventario.component.html',
  styleUrl: './emergente-reporte-inventario.component.css',
})
export class EmergenteReporteInventarioComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ReporteinventarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productoserv: ProductoService
  ) {}
  datos: any = [];
  productos_entre_fechas: any = [];
  todos_los_productos: any = [];
  productoscompras: any = [];
  productosventas: any = [];
  ngOnInit(): void {
    switch (this.data.texto) {
      case 'REPORTE DE PRODUCTOS CON FECHA DE VENCIMIENTO PROXIMA':
        this.productoserv
          .reporte(
            this.data.fecha1.getDate(),
            this.data.fecha1.getMonth() + 1,
            this.data.fecha1.getFullYear(),
            this.data.fecha2.getDate(),
            this.data.fecha2.getMonth() + 1,
            this.data.fecha2.getFullYear()
          )
          .subscribe((data: any) => {
            this.productos_entre_fechas = data;
            // Ordenar los datos por fecha de expiración
            this.productos_entre_fechas.sort((a: any, b: any) => {
              return (
                new Date(a.fecha_expiracion).getTime() -
                new Date(b.fecha_expiracion).getTime()
              );
            });
          });
        break;
      case 'REPORTE DE COMPRAS Y VENTAS DEL PRODUCTO':
        this.productoserv
          .reportecomprasventasproducto(
            this.data.fecha1.getDate(),
            this.data.fecha1.getMonth() + 1,
            this.data.fecha1.getFullYear(),
            this.data.fecha2.getDate(),
            this.data.fecha2.getMonth() + 1,
            this.data.fecha2.getFullYear(),
            this.data.codigo
          )
          .subscribe((data: any) => {
            this.productoscompras = data.productos_compras;
            this.productosventas = data.productos_ventas;

            console.log(this.productoscompras);
            console.log(this.productosventas);
            // Ordenar los datos por fecha de expiración
            this.productoscompras.sort((a: any, b: any) => {
              return (
                new Date(a.fecha_expiracion).getTime() -
                new Date(b.fecha_expiracion).getTime()
              );
            });
            this.productosventas.sort((a: any, b: any) => {
              return (
                new Date(a.fecha_expiracion).getTime() -
                new Date(b.fecha_expiracion).getTime()
              );
            });
          });
        break;

      case 'REPORTE DE PRODUCTOS CON FECHA DE VENCIMIENTO DE ESTA SEMANA':
        this.productoserv
          .reporte(
            this.data.fecha1.getDate(),
            this.data.fecha1.getMonth() + 1,
            this.data.fecha1.getFullYear(),
            this.data.fecha2.getDate(),
            this.data.fecha2.getMonth() + 1,
            this.data.fecha2.getFullYear()
          )
          .subscribe((data: any) => {
            this.productos_entre_fechas = data;
            // Ordenar los datos por fecha de expiración
            this.productos_entre_fechas.sort((a: any, b: any) => {
              return (
                new Date(a.fecha_expiracion).getTime() -
                new Date(b.fecha_expiracion).getTime()
              );
            });
          });
        break;

      case 'REPORTE GENERAL DE INVENTARIO':
        console.log(this.data.fecha1);
        console.log(this.data.fecha2);
        this.productoserv
          .reporteinventariogeneral(
            this.data.fecha1.getDate(),
            this.data.fecha1.getMonth() + 1,
            this.data.fecha1.getFullYear(),
            this.data.fecha2.getDate(),
            this.data.fecha2.getMonth() + 1,
            this.data.fecha2.getFullYear()
          )
          .subscribe((data: any) => {
            this.productos_entre_fechas = data.productos_entre_fechas;
            this.todos_los_productos = data.todos_los_productos;

            // Ordenar productos vencidos
            this.productos_entre_fechas.sort((a: any, b: any) => {
              return (
                new Date(a.fecha_expiracion).getTime() -
                new Date(b.fecha_expiracion).getTime()
              );
            });

            // Ordenar todos los productos
            this.todos_los_productos.sort((a: any, b: any) => {
              return (
                new Date(a.fecha_expiracion).getTime() -
                new Date(b.fecha_expiracion).getTime()
              );
            });

            console.log(this.productos_entre_fechas);
            console.log(this.todos_los_productos);
          });
        break;

      default:
        break;
    }
  }
  generarPDF() {}

  generarpdfventasycompras() {
    const cuerpoVencidos = this.productosventas.map((item: any) => [
      item.codigo,
      item.nombre,
      item.usuario,
      item.cliente,
      item.fecha,
      item.cantidad,
    ]);

    const cuerpoProductos = this.productoscompras.map((item: any) => [
      item.codigo,
      item.nombre,
      item.usuario,
      item.proveedor,
      item.fecha,
      item.cantidad,
    ]);

    const doc = new jsPDF();

    // Logotipo en formato base64
    const logoBase64 = 'assets/images/logopdf.jpg'; // Coloca el código base64 aquí
    doc.addImage(logoBase64, 'JPEG', 20, 10, 20, 20);

    // Título
    doc.setFontSize(18);
    doc.text(this.data.texto, 14, 40);

    // Descripción debajo del título
    doc.setFontSize(12);
    const descripcion =
      'Para el producto ' +
      this.data.producto +
      ' código:' +
      this.data.codigo +
      ' entre las fechas ' +
      this.fechanumero(this.data.fecha1) +
      ' al ' +
      this.fechanumero(this.data.fecha2);
    doc.text(descripcion, 14, 50);

    // Encabezado de la primera tabla
    doc.setFontSize(12);
    const nombretabla1 = 'Tabla de movimientos de ventas';
    doc.text(nombretabla1, 14, 60);

    // Primera tabla (ventas)
    (doc as any).autoTable({
      head: [['Código', 'Nombre', 'Usuario', 'Cliente', 'Fecha', 'Cantidad']],
      body: cuerpoVencidos,
      startY: 65,
      theme: 'grid',
    });

    // Salto de página para la segunda tabla
    doc.addPage();

    // Encabezado de la segunda tabla
    doc.setFontSize(12);
    const nombretabla2 = 'Tabla de movimientos de compras';
    doc.text(nombretabla2, 14, 20);

    // Segunda tabla (compras)
    (doc as any).autoTable({
      head: [['Código', 'Nombre', 'Usuario', 'Proveedor', 'Fecha', 'Cantidad']],
      body: cuerpoProductos,
      startY: 30,
      theme: 'grid',
    });

    // Descargar el PDF
    doc.save(this.data.texto + '.pdf');
  }

  generarPDFgeneral() {
    const cuerpoVencidos = this.productos_entre_fechas.map((item: any) => [
      item.codigo,
      item.nombre,
      item.descripcion,
      item.peso,
      item.unidad,
      item.precio_compra,
      item.precio_venta,
      item.fecha_expiracion,
      item.porcaducar,
    ]);

    const cuerpoProductos = this.todos_los_productos.map((item: any) => [
      item.codigo,
      item.nombre,
      item.descripcion,
      item.peso,
      item.unidad,
      item.categoria,
      item.precio_compra,
      item.precio_venta,
      item.stock,
    ]);

    const doc = new jsPDF();

    // Agregar logo (se recomienda que el logo esté en formato base64)
    const logo = 'assets/images/logopdf.jpg'; // Coloca aquí el base64 del logo
    doc.addImage(logo, 'JPEG', 20, 10, 20, 20); // Posición x, y y tamaño del logo

    // Agregar título debajo del logo
    doc.setFontSize(18);
    doc.text(this.data.texto, 14, 40); // Título, debajo del logo (ajusta la coordenada y según sea necesario)

    // Agregar descripción debajo del título
    doc.setFontSize(12);
    const descripcion =
      ' Tomando datos desde el : ' +
      this.fechaATexto(this.data.fecha1) +
      ' al ' +
      this.fechaATexto(this.data.fecha2);
    doc.text(descripcion, 14, 50); // Descripción debajo del título (ajusta la coordenada y según sea necesario)

    // Generar la tabla de productos vencidos
    (doc as any).autoTable({
      head: [
        [
          'Código',
          'Nombre',
          'Descripción',
          'Peso',
          'Unidad',
          'Precio de compra',
          'Precio de venta',
          'Fecha de Expiración',
          'Stock por caducar',
        ],
      ],
      body: cuerpoVencidos,
      startY: 55, // Iniciar tabla un poco más abajo de la descripción
      theme: 'grid',
      didParseCell: (data: any) => {
        if (data.column.index === 7) {
          // Índice de `fecha_expiracion`
          const fechaActual = new Date(); // Fecha actual
          const fechaExpiracion = new Date(data.cell.raw); // Convertir a objeto Date
          const diferenciaDias = Math.floor(
            (fechaExpiracion.getTime() - fechaActual.getTime()) /
              (1000 * 60 * 60 * 24)
          );

          // Cambiar color de fondo según la diferencia en días
          if (diferenciaDias <= 7) {
            data.cell.styles.fillColor = [255, 0, 0]; // Rojo (expira en una semana o menos)
          } else if (diferenciaDias > 7 && diferenciaDias <= 180) {
            data.cell.styles.fillColor = [255, 255, 0]; // Amarillo (expira en más de una semana, pero menos de 6 meses)
          } else {
            data.cell.styles.fillColor = [0, 255, 0]; // Verde (expira después de 6 meses)
          }
        }
        if (data.column.index === 8) {
          // Índice de `stock por caducar`
          const stock = data.cell.raw; // Obtener stock
          data.cell.styles.fillColor = this.getColorstock(stock); // Usar función para obtener color
        }
      },
    });

    // Salto de página para la segunda tabla
    doc.addPage();

    // Generar la tabla de productos que vencen en el siguiente año y medio
    (doc as any).autoTable({
      head: [
        [
          'Código',
          'Nombre',
          'Descripción',
          'Peso',
          'Unidad',
          'Categoría',
          'Precio de compra',
          'Precio de venta',
          'Stock',
        ],
      ],
      body: cuerpoProductos,
      startY: 20, // Iniciar tabla un poco más abajo del encabezado de la página
      theme: 'grid',
      didParseCell: (data: any) => {
        if (data.column.index === 8) {
          // Índice de `fecha_expiracion`
          const fechaActual = new Date(); // Fecha actual
          const fechaExpiracion = new Date(data.cell.raw); // Convertir a objeto Date
          const diferenciaDias = Math.floor(
            (fechaExpiracion.getTime() - fechaActual.getTime()) /
              (1000 * 60 * 60 * 24)
          );

          // Cambiar color de fondo según la diferencia en días
          if (diferenciaDias <= 7) {
            data.cell.styles.fillColor = [255, 0, 0]; // Rojo (expira en una semana o menos)
          } else if (diferenciaDias > 7 && diferenciaDias <= 180) {
            data.cell.styles.fillColor = [255, 255, 0]; // Amarillo (expira en más de una semana, pero menos de 6 meses)
          } else {
            data.cell.styles.fillColor = [0, 255, 0]; // Verde (expira después de 6 meses)
          }
        }
        if (data.column.index === 9) {
          // Índice de `stock`
          const stock = data.cell.raw; // Obtener stock
          data.cell.styles.fillColor = this.getColorstock(stock); // Usar función para obtener color
        }
      },
    });

    // Descargar el PDF
    doc.save(this.data.texto + '.pdf');
  }
  getColorfecha(fechaExpiracion: string): string {
    const fechaActual = new Date();
    const expDate = new Date(fechaExpiracion);

    const diffTime = expDate.getTime() - fechaActual.getTime();
    const diffMonths = diffTime / (1000 * 60 * 60 * 24 * 30); // Aproximadamente meses

    if (diffMonths <= 2) {
      return 'red'; // Rojo si falta 2 meses o menos
    } else if (diffMonths > 2 && diffMonths <= 12) {
      return 'yellow'; // Amarillo si falta entre 2 meses y 1 año
    } else {
      return 'green'; // Verde si falta más de un año
    }
  }
  getColorstock(stock: number): string {
    const lowStockThreshold = 10; // Umbral para stock bajo
    const mediumStockThreshold = 50; // Umbral para stock medio

    if (stock <= lowStockThreshold) {
      return 'red'; // Rojo si el stock es bajo o igual a 10
    } else if (stock > lowStockThreshold && stock <= mediumStockThreshold) {
      return 'yellow'; // Amarillo si el stock está entre 11 y 50
    } else {
      return 'green'; // Verde si el stock es mayor a 50
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
