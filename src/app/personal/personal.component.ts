import { Component, OnInit } from '@angular/core';
import { PersonalService } from '../services/personal.service';
import { ToastrService } from 'ngx-toastr';
import { Personal } from '../models/personal';
import { environment } from '../environments/environments.prod';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import Swal from 'sweetalert2';
import { CrearPersonalComponent } from './crear-personal/crear-personal.component';
import { error } from 'node:console';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { animation } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrl: './personal.component.css',
})
export class PersonalComponent implements OnInit {
  constructor(
    private route: Router,
    private personalServ: PersonalService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {}
  base = environment.base;
  personal: Personal[] = [];

  type: string | null | undefined;

  ngOnInit(): void {
    this.type = localStorage.getItem('access');
    if (this.type == '' || this.type == '2' || this.type == '3') {
      this.toastr.warning('No tiene acceso', 'Inicia sesion');
      this.route.navigate(['/home']);
    }
    this.personalServ.listar().subscribe((data) => {
      this.personal = data;
    });
  }

  llenar_imagen(nombre: string): string {
    return this.base + 'user/imagen/' + nombre;
  }

  eliminar(item: Personal): void {
    Swal.fire({
      title: 'Esta seguro que quieres eliminar este registro?',
      text: item.apellido + ' ' + item.nombre,
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
        this.personalServ.eliminar(item.id).subscribe((data) => {
          this.personal = data;
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado', 'No se elimino el registro', 'error');
      }
    });
  }

  openDialog() {
    let personal: Personal;
    personal = {
      id: 0,
      nombre: '',
      apellido: '',
      password: '',
      fecha_inicio: '',
      tipo: '',
      ci: '',
      correo: '',
      telefono: '',
      direccion: '',
      salario: '',
      imagen: '',
      farmacia_id: '1',
    };
    const dialogRef = this.dialog.open(CrearPersonalComponent, {
      data: { personal: personal, texto: 'REGISTRAR NUEVO USUARIO' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      personal = {
        id: 0,
        nombre: result.value.nombre,
        apellido: result.value.apellido,
        password: result.value.password,
        fecha_inicio: result.value.fecha_inicio,
        tipo: result.value.tipo,
        ci: result.value.ci,
        correo: result.value.correo,
        telefono: result.value.telefono,
        direccion: result.value.direccion,
        salario: result.value.salario,
        imagen: result.value.nombreimagen,
        farmacia_id: '1',
      };
      personal.fecha_inicio = this.convertirfecha(personal.fecha_inicio);
      this.personalServ.agregar(personal).subscribe(
        (data) => {
          this.personal = data;
          this.toastr.success('Exito', 'Registro guardado');
        },
        (error) => {
          this.toastr.error(
            'Error',
            'Ya existe un usuario con ese numero de ci'
          );
        }
      );
    });
  }

  actualizar(item: Personal) {
    let personal: Personal;
    const dialogRef = this.dialog.open(CrearPersonalComponent, {
      data: { personal: item, texto: 'EDITAR USUARIO' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      personal = {
        id: item.id,
        nombre: result.value.nombre,
        apellido: result.value.apellido,
        password: result.value.password,
        fecha_inicio: result.value.fecha_inicio,
        tipo: result.value.tipo,
        ci: result.value.ci,
        correo: result.value.correo,
        telefono: result.value.telefono,
        direccion: result.value.direccion,
        salario: result.value.salario,
        imagen: result.value.nombreimagen,
        farmacia_id: '1',
      };
      if (personal.imagen.length == 0) {
        personal.imagen = 'predeterminado.jpg';
      }
      personal.fecha_inicio = this.convertirfecha(personal.fecha_inicio);
      this.personalServ.actualizar(personal, item.id).subscribe(
        (data) => {
          this.personal = data;
          this.toastr.success('Exito', 'Registro Actualizado');
        },
        (error) => {
          this.toastr.error(
            'Error',
            'Ya existe un usuario con ese numero de ci'
          );
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

  importarinventario() {}
}
