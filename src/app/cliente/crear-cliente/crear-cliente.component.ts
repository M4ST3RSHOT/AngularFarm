import { Component, Inject } from '@angular/core';
import { environment } from '../../environments/environments.prod';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClienteComponent } from '../cliente.component';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrl: './crear-cliente.component.css',
})
export class CrearClienteComponent {
  texto: string = '';
  public name: string = '';
  base = environment.base;
  public previsualizacion: string = '';
  myControl = new FormControl('');
  options: string[] = ['Administrador', 'Ventas', 'Inventario'];

  constructor(
    public dialogRef: MatDialogRef<ClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private clienteserv: ClienteService
  ) {
    this.texto = data.texto;
    this.nombre?.setValue(data.cliente.nombre);
    this.apellido?.setValue(data.cliente.apellido);
    this.fecha_nacimiento?.setValue(data.cliente.fecha_nacimiento);
    this.ci?.setValue(data.cliente.ci);
    this.correo?.setValue(data.cliente.correo);
    this.telefono?.setValue(data.cliente.telefono);
    if (data.cliente.imagen != '') {
      this.previsualizacion =
        this.base + 'cliente/imagen/' + data.cliente.imagen;
    }
  }

  agregar = new FormGroup({
    id: new FormControl('', []),
    nombre: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z\s]*$/),
      Validators.minLength(3),
      Validators.maxLength(15),
    ]),
    apellido: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z\s]*$/),
      Validators.minLength(3),
      Validators.maxLength(15),
    ]),
    fecha_nacimiento: new FormControl('', [
      Validators.required,
      this.fechaMenorOIgualAFechaActual, // Validador personalizado
    ]),
    ci: new FormControl('', [
      Validators.required,
      Validators.pattern(/^-?\d+$/),
      Validators.minLength(7),
      Validators.maxLength(15),
    ]),
    correo: new FormControl('', [Validators.required, Validators.email]),
    telefono: new FormControl('', [
      Validators.required,
      Validators.pattern(/^-?\d+$/),
      Validators.minLength(7),
      Validators.maxLength(15),
    ]),
    imagen: new FormControl(''),
    nombreimagen: new FormControl('', []),
  });

  get nombre() {
    return this.agregar.get('nombre');
  }
  get apellido() {
    return this.agregar.get('apellido');
  }
  get fecha_nacimiento() {
    return this.agregar.get('fecha_nacimiento');
  }
  get ci() {
    return this.agregar.get('ci');
  }
  get correo() {
    return this.agregar.get('correo');
  }
  get telefono() {
    return this.agregar.get('telefono');
  }
  get imagen() {
    return this.agregar.get('imagen');
  }
  get nombreimagen() {
    return this.agregar.get('nombreimagen');
  }

  fechaMenorOIgualAFechaActual(
    control: AbstractControl
  ): ValidationErrors | null {
    const fechaActual = new Date(); // Fecha actual
    const fechaInicio = new Date(control.value); // Valor ingresado en el campo

    if (isNaN(fechaInicio.getTime())) {
      return { fechaInvalida: true }; // Si la fecha no es válida (mal ingresada o vacía)
    }

    if (fechaInicio > fechaActual) {
      return { fechaInvalida: true }; // Si la fecha de inicio es mayor que la fecha actual
    }

    return null; // La fecha es válida
  }

  cargarimagen(event: any): void {
    let file: File = <File>event.target.files[0];
    this.name = file.name;
    this.nombreimagen?.setValue(this.name);
    this.previsualizar(file);
    this.clienteserv.subirimagen(file, this.name).subscribe((data) => {});
  }

  previsualizar(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.previsualizacion = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  getErrorMessage(controlName: string): string {
    const control = this.agregar.get(controlName);
    if (!control || !control.errors) return '';

    const errors = control.errors;

    if (errors['required']) return 'Campo Obligatorio';
    if (errors['minlength'])
      return `Ingrese mínimo ${errors['minlength'].requiredLength} caracteres`;
    if (errors['maxlength'])
      return `Ingrese máximo ${errors['maxlength'].requiredLength} caracteres`;
    if (errors['fechaInvalida'])
      return 'La fecha no puede ser mayor a la actual';
    if (errors['email']) return 'Ingrese un formato email valido';
    if (errors['pattern']) {
      if (control === this.nombre) return 'Ingrese solamente letras';
      if (control === this.apellido) return 'Ingrese solamente letras';
      if (control === this.ci) return 'Ingrese solamente numeros';
      if (control === this.telefono) return 'Ingrese solamente numeros';
    }
    return '';
  }
}
