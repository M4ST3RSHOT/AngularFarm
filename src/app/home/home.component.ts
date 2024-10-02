import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { single } from 'rxjs';
import { Cliente } from '../models/cliente';
import { Producto } from '../models/producto';
import { ClienteService } from '../services/cliente.service';
import { ProductoService } from '../services/producto.service';
import { CrearClienteComponent } from '../cliente/crear-cliente/crear-cliente.component';
import { CrearProductoComponent } from '../producto/crear-producto/crear-producto.component';
import { MatDialog } from '@angular/material/dialog';
import { DetalleService } from '../services/detalle.service';
import { LoteService } from '../services/lote.service';
import { Color, ScaleType } from '@swimlane/ngx-charts';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(
    private loteserv: LoteService,
    private detalleServ: DetalleService,
    private route: Router,
    private toastr: ToastrService,
    private clienteServ: ClienteService,
    private productoServ: ProductoService,
    public dialog: MatDialog
  ) {}
  type: string | null | undefined;
  fecha = new Date();
  mes: number = this.fecha.getMonth() + 1;
  dia: number = this.fecha.getDate();
  gestion: number = this.fecha.getFullYear();
  infosemana: any[] = [];
  infomes: any[] = [];
  single1: any[] = [];
  single2: any[] = [];
  Consultaproductosvencidos: any[] = [];

  ngOnInit() {
    this.type = localStorage.getItem('access');
    if (this.type == '' || this.type == '2' || this.type == '3') {
      this.toastr.warning('No tiene acceso', 'Inicia sesion');
      this.route.navigate(['/home']);
    }
    this.detalleServ
      .mayorventasmes(this.mes, this.gestion)
      .subscribe((data) => {
        this.single1 = data;
      });
    this.detalleServ
      .mayorventassemana(this.dia, this.mes, this.gestion)
      .subscribe((data) => {
        this.single2 = data;
      });
    this.loteserv
      .productosporvencer(this.dia, this.mes, this.gestion)
      .subscribe((data) => {
        this.Consultaproductosvencidos = data;
        console.log(this.Consultaproductosvencidos);
      });
  }
  view: [number, number] = [400, 220];
  // options
  gradient: boolean = false;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: any = 'left';

  customColorScheme: Color = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#47466d', '#8fcdd8', '#46cdcf', '#8fcdd8'],
  };

  cliente: Cliente[] = [];
  nuevocliente() {
    let cliente: Cliente;
    cliente = {
      id: 0,
      nombre: '',
      apellido: '',
      fecha_nacimiento: '',
      ci: '',
      correo: '',
      telefono: '',
      imagen: '',
    };
    const dialogRef = this.dialog.open(CrearClienteComponent, {
      data: { cliente: cliente, texto: 'Crear Cliente' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      cliente = {
        id: 0,
        nombre: result.value.nombre,
        apellido: result.value.apellido,
        fecha_nacimiento: result.value.fecha_nacimiento,
        ci: result.value.ci,
        correo: result.value.correo,
        telefono: result.value.telefono,
        imagen: result.value.nombreimagen,
      };
      cliente.fecha_nacimiento = this.convertirfecha(cliente.fecha_nacimiento);
      this.clienteServ.agregar(cliente).subscribe(
        (data) => {
          this.cliente = data;
          this.toastr.success('Exito', 'Registro guardado');
        },
        (error) => {
          this.toastr.error('Error', 'Operacion Cancelada');
        }
      );
    });
  }

  producto: Producto[] = [];
  nuevoproducto() {
    let producto: Producto;
    producto = {
      id: 0,
      nombre: '',
      codigo: '',
      descripcion: '',
      unidad: '',
      peso: '',
      categoria_id: '',
      precio_compra: '',
      precio_venta: '',
      imagen: '',
      stock: '0',
    };
    const dialogRef = this.dialog.open(CrearProductoComponent, {
      data: { producto: producto, texto: 'Crear Producto' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      producto = {
        id: 0,
        nombre: result.value.nombre,
        codigo: result.value.codigo,
        descripcion: result.value.descripcion,
        unidad: result.value.unidad,
        peso: result.value.peso,
        categoria_id: result.value.categoria_id,
        precio_compra: result.value.precio_compra,
        precio_venta: result.value.precio_venta,
        imagen: result.value.nombreimagen,
        stock: '0',
      };
      this.productoServ.agregar(producto).subscribe(
        (data) => {
          this.producto = data;
          this.toastr.success('Exito', 'Registro guardado');
        },
        (error) => {
          this.toastr.error('Error', 'Operacion Cancelada');
        }
      );
    });
  }

  convertirStringADate(fechaString: string): Date {
    return new Date(fechaString);
  }

  convertirfecha(fecha: string): string {
    const fechaConvertida = this.convertirStringADate(fecha);
    const anio = fechaConvertida.getFullYear();
    const mes = fechaConvertida.getMonth() + 1; // Se agrega 1 porque getMonth() devuelve valores de 0 a 11
    const dia = fechaConvertida.getDate();
    fecha = anio + '-' + mes + '-' + dia;
    return fecha;
  }

  compra(): void {
    this.route.navigate(['/crear-compra']);
  }

  venta(): void {
    this.route.navigate(['/crear-venta']);
  }

  informe(): void {
    this.route.navigate(['/reporte']);
  }
}
