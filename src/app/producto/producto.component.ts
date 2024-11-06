import { Component, ViewChild } from '@angular/core';
import { CrearProductoComponent } from './crear-producto/crear-producto.component';
import { OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from '../services/producto.service';
import { environment } from '../environments/environments.prod';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import Swal from 'sweetalert2';
import { error } from 'node:console';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { animation } from '@angular/animations';
import { Producto } from '../models/producto';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CategoriaService } from '../services/categoria.service';
import { Categoria } from '../models/categoria';
import { catchError } from 'rxjs';
import { ImportarinventarioComponent } from './importarinventario/importarinventario.component';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css',
})
export class ProductoComponent implements OnInit {
  constructor(
    private route: Router,
    private productoServ: ProductoService,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private categoriaserv: CategoriaService
  ) {}
  base = environment.base;
  producto: Producto[] = [];
  categoria: Categoria[] = [];
  type: string | null | undefined;
  idcategoria: any = '';
  ngOnInit(): void {
    this.type = localStorage.getItem('access');
    if (this.type == '') {
      this.toastr.warning('No tiene acceso', 'Inicia sesion');
      this.route.navigate(['/home']);
    } else {
      this.productoServ.listar().subscribe((data) => {
        this.producto = data;
        this.dataSource = new MatTableDataSource(this.producto);
        this.dataSource.paginator = this.paginator;
      });
      this.categoriaserv.listar().subscribe((data) => {
        this.categoria = data;
      });
    }
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  displayedColumns: string[] = [
    'id',
    'codigo',
    'nombre',
    'descripcion',
    'unidad',
    'peso',
    'categoria',
    'preciocompra',
    'precioventa',
    'imagen',
    'stock',
    'stockdeseado',
    'opcion',
  ];
  dataSource!: MatTableDataSource<Producto>;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator = this.paginator;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  llenar_imagen(nombre: string): string {
    return this.base + 'producto/imagen/' + nombre;
  }

  eliminar(item: Producto): void {
    Swal.fire({
      title: 'Esta seguro que quieres eliminar este registro?',
      text: item.nombre + ' ' + item.descripcion,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar.',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Eliminado!',
          'El usuario a sido eliminado exitosamente',
          'success'
        );
        this.productoServ.eliminar(item.id).subscribe((data) => {
          this.toastr.success('Eliminado', 'Registro eliminado con exito');
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado', 'No se elimino el registro', 'error');
      }
    });
  }

  openDialog() {
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
      stock: '',
      stockdeseado: '',
    };
    const dialogRef = this.dialog.open(CrearProductoComponent, {
      data: { producto: producto, texto: 'REGISTRAR NUEVO PRODUCTO' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      for (let i = 0; i < this.categoria.length; i++) {
        if (this.categoria[i].nombre == result.value.categoria_id) {
          this.idcategoria = this.categoria[i].id;
        }
      }

      producto = {
        id: 0,
        nombre: result.value.nombre,
        codigo: result.value.codigo,
        descripcion: result.value.descripcion,
        unidad: result.value.unidad,
        peso: result.value.peso,
        categoria_id: this.idcategoria,
        precio_compra: result.value.precio_compra,
        precio_venta: result.value.precio_venta,
        imagen: result.value.nombreimagen,
        stock: result.value.stock,
        stockdeseado: result.value.stockdeseado,
      };
      if (producto.imagen.length == 0) {
        producto.imagen = 'predeterminado.jpg';
      }
      this.productoServ.agregar(producto).subscribe(
        (data) => {
          this.toastr.success('Exito', 'Registro Actualizado');
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        },
        (error) => {
          this.toastr.error('Error del servidor', 'Operacion Cancelada');
        }
      );
    });
  }

  actualizar(item: Producto) {
    let producto: Producto;
    const dialogRef = this.dialog.open(CrearProductoComponent, {
      data: { producto: item, texto: 'EDITAR PRODUCTO' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      producto = {
        id: item.id,
        nombre: result.value.nombre,
        codigo: result.value.codigo,
        descripcion: result.value.descripcion,
        unidad: result.value.unidad,
        peso: result.value.peso,
        categoria_id: result.value.categoria_id,
        precio_compra: result.value.precio_compra,
        precio_venta: result.value.precio_venta,
        imagen: result.value.nombreimagen,
        stock: result.value.stock,
        stockdeseado: result.value.stockdeseado,
      };

      if (producto.imagen.length == 0) {
        producto.imagen = 'predeterminado.jpg';
      }
      this.productoServ.actualizar(producto, item.id).subscribe(
        (data) => {
          this.toastr.success('Exito', 'Registro Actualizado');
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        },
        (error) => {
          this.toastr.error('Error', 'Operacion Cancelada');
        }
      );
    });
  }

  importarinventario() {
    const dialogRef = this.dialog.open(ImportarinventarioComponent);
    dialogRef.afterClosed().subscribe((result) => {});
  }
  funcionxd() {}
}
