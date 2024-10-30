import { Component, Inject } from '@angular/core';
import { environment } from '../../environments/environments.prod';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProveedorComponent } from '../proveedor.component';
import { ProveedorService } from '../../services/proveedor.service';

@Component({
  selector: 'app-crear-proveedor',
  templateUrl: './crear-proveedor.component.html',
  styleUrl: './crear-proveedor.component.css',
})
export class CrearProveedorComponent {
  texto: string = '';
  public name: string = '';
  base = environment.base;
  public previsualizacion: string = '';
  myControl = new FormControl('');
  options: string[] = ['Administrador', 'Ventas', 'Inventario'];

  constructor(
    public dialogRef: MatDialogRef<ProveedorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private proveedorServ: ProveedorService
  ) {
    this.texto = data.texto;
    this.nombre?.setValue(data.proveedor.nombre);
    this.telefono?.setValue(data.proveedor.telefono);
    this.direccion?.setValue(data.proveedor.direccion);
    this.cinit?.setValue(data.proveedor.cinit);
  }

  agregar = new FormGroup({
    id: new FormControl('', []),
    nombre: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z\s]*$/),
      Validators.minLength(3),
      Validators.maxLength(25),
    ]),
    cinit: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d+$/),

      Validators.minLength(3),
      Validators.maxLength(25),
    ]),
    telefono: new FormControl('', [
      Validators.required,
      Validators.pattern(/^-?\d+$/),
      Validators.minLength(7),
      Validators.maxLength(35),
    ]),
    direccion: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(35),
      Validators.pattern(/^[a-zA-Z0-9\s]*$/),
    ]),
  });

  get nombre() {
    return this.agregar.get('nombre');
  }
  get telefono() {
    return this.agregar.get('telefono');
  }
  get direccion() {
    return this.agregar.get('direccion');
  }
  get cinit() {
    return this.agregar.get('cinit');
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
      if (control === this.cinit) return 'Ingrese solamente numeros';
      if (control === this.telefono) return 'Ingrese solamente numeros';
      if (control === this.direccion) return 'Solamente numeros y letras';
    }
    return '';
  }
}
