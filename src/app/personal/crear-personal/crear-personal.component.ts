import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PersonalComponent } from '../personal.component';
import { Personal } from '../../models/personal';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { environment } from '../../environments/environments.prod';
import { PersonalService } from '../../services/personal.service';

@Component({
  selector: 'app-crear-personal',
  templateUrl: './crear-personal.component.html',
  styleUrl: './crear-personal.component.css',
})
export class CrearPersonalComponent {
  texto: string = '';
  public name: string = '';
  base = environment.base;
  public previsualizacion: string = '';
  myControl = new FormControl('');
  options: string[] = ['Administrador', 'Ventas', 'Inventario'];

  constructor(
    public dialogRef: MatDialogRef<PersonalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private personalserv: PersonalService
  ) {
    this.texto = data.texto;
    this.nombre?.setValue(data.personal.nombre);
    this.apellido?.setValue(data.personal.apellido);
    this.password?.setValue(data.personal.password);
    if (data.texto == 'Editar Usuario') {
      this.password?.clearValidators();
      this.imagen?.clearValidators();
    }
    this.fecha_inicio?.setValue(data.personal.fecha_inicio);

    this.tipo?.setValue(data.personal.tipo);
    this.ci?.setValue(data.personal.ci);
    this.correo?.setValue(data.personal.correo);
    this.telefono?.setValue(data.personal.telefono);
    this.direccion?.setValue(data.personal.direccion);
    this.salario?.setValue(data.personal.salario);
    // this.imagen?.setValue(data.personal.imagen)
    if (data.personal.imagen != '') {
      this.previsualizacion =
        this.base + 'personal/imagen/' + data.personal.imagen;
    }
    this.farmacia_id?.setValue(data.personal.farmacia_id);
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
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9\s]*$/),
      Validators.minLength(8),
      Validators.maxLength(20),
    ]),
    fecha_inicio: new FormControl('', [
      Validators.required,
      this.fechaMenorOIgualAFechaActual, // Validador personalizado
    ]),
    tipo: new FormControl('', [Validators.required]),
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
      Validators.minLength(8),
      Validators.maxLength(12),
    ]),
    direccion: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(40),
    ]),
    salario: new FormControl('', [
      Validators.required,
      Validators.pattern(/^-?\d+$/),
      Validators.minLength(3),
      Validators.maxLength(5),
    ]),
    imagen: new FormControl(''),
    farmacia_id: new FormControl('', [Validators.required]),
    nombreimagen: new FormControl('', []),
  });

  get nombre() {
    return this.agregar.get('nombre');
  }
  get apellido() {
    return this.agregar.get('apellido');
  }
  get password() {
    return this.agregar.get('password');
  }
  get fecha_inicio() {
    return this.agregar.get('fecha_inicio');
  }
  get tipo() {
    return this.agregar.get('tipo');
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
  get direccion() {
    return this.agregar.get('direccion');
  }
  get salario() {
    return this.agregar.get('salario');
  }
  get imagen() {
    return this.agregar.get('imagen');
  }
  get farmacia_id() {
    return this.agregar.get('farmacia_id');
  }
  get nombreimagen() {
    return this.agregar.get('nombreimagen');
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
      if (control === this.password) return 'Solamente letras y numeros';
      if (control === this.salario) return 'Ingrese solamente numeros';
    }
    return '';
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
    this.personalserv.subirimagen(file, this.name).subscribe((data) => {});
  }

  previsualizar(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.previsualizacion = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}
