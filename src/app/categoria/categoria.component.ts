import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../services/categoria.service';
import { environment } from '../environments/environments.prod';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import Swal from 'sweetalert2';
import { error } from 'node:console';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { animation } from '@angular/animations';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from '../models/categoria';
import { CrearCategoriaComponent } from './crear-categoria/crear-categoria.component';
import { Router } from '@angular/router';
import { DetallarProductoComponent } from './detallar-producto/detallar-producto.component';
import { text } from 'stream/consumers';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css',
})
export class CategoriaComponent implements OnInit {
  constructor(
    private route: Router,
    private categoriaServ: CategoriaService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  base = environment.base;
  categoria: Categoria[] = [];
  type: string | null | undefined;
  ngOnInit(): void {
    this.type = localStorage.getItem('access');
    if (this.type == '') {
      this.toastr.warning('No tiene acceso', 'Inicia sesion');
      this.route.navigate(['/home']);
    }
    this.categoriaServ.listar().subscribe((data) => {
      this.categoria = data;
    });
  }

  llenar_imagen(nombre: string): string {
    return this.base + 'categoria/imagen/' + nombre;
  }

  eliminar(item: Categoria): void {
    Swal.fire({
      title: 'Esta seguro que quieres eliminar esta Categoria?',
      text: item.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar.',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Eliminado!',
          'La categoria a sido eliminado exitosamente',
          'success'
        );
        this.categoriaServ.eliminar(item.id).subscribe((data) => {
          this.categoria = data;
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado', 'No se elimino el registro', 'error');
      }
    });
  }

  openDialog() {
    let categoria: Categoria;
    categoria = {
      id: 0,
      nombre: '',
      imagen: '',
    };
    const dialogRef = this.dialog.open(CrearCategoriaComponent, {
      data: { categoria: categoria, texto: 'CREAR NUEVA CATEGORIA' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      categoria = {
        id: 0,
        nombre: result.value.nombre,
        imagen: result.value.nombreimagen,
      };
      if (categoria.imagen.length == 0) {
        categoria.imagen = 'predeterminado.jpg';
      }
      this.categoriaServ.agregar(categoria).subscribe(
        (data) => {
          this.categoria = data;
          this.toastr.success('Exito', 'Registro guardado');
        },
        (error) => {
          this.toastr.error('Error', 'La categoria ya esta registrada');
        }
      );
    });
  }

  actualizar(item: Categoria) {
    let categoria: Categoria;
    const dialogRef = this.dialog.open(CrearCategoriaComponent, {
      data: { categoria: item, texto: 'EDITAR CATEGORIA' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      categoria = {
        id: item.id,
        nombre: result.value.nombre,
        imagen: result.value.nombreimagen,
      };
      if (categoria.imagen.length == 0) {
        categoria.imagen = 'predeterminado.jpg';
      }
      this.categoriaServ.actualizar(categoria, item.id).subscribe(
        (data) => {
          this.categoria = data;
          this.toastr.success('Exito', 'Registro Actualizado');
        },
        (error) => {
          this.toastr.error('Error', 'La categoria ya esta registrada');
        }
      );
    });
  }

  visualizar(item: Categoria) {
    const dialogRef = this.dialog.open(DetallarProductoComponent, {
      data: item,
    });
  }
}
