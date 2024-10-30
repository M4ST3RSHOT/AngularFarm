import { Component, Inject } from '@angular/core';
import { environment } from '../../environments/environments.prod';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoriaComponent } from '../categoria.component';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-crear-categoria',
  templateUrl: './crear-categoria.component.html',
  styleUrl: './crear-categoria.component.css',
})
export class CrearCategoriaComponent {
  texto: string = '';
  public name: string = '';
  base = environment.base;
  public previsualizacion: string = '';
  myControl = new FormControl('');
  options: string[] = ['Administrador', 'Ventas', 'Inventario'];

  constructor(
    public dialogRef: MatDialogRef<CategoriaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoriaServ: CategoriaService
  ) {
    this.texto = data.texto;
    this.nombre?.setValue(data.categoria.nombre);
    if (data.categoria.imagen != '') {
      this.previsualizacion =
        this.base + 'categoria/imagen/' + data.categoria.imagen;
    }
  }

  agregar = new FormGroup({
    id: new FormControl('', []),
    nombre: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z\s]*$/),
    ]),
    imagen: new FormControl(''),
    nombreimagen: new FormControl('', []),
  });

  get nombre() {
    return this.agregar.get('nombre');
  }
  get imagen() {
    return this.agregar.get('imagen');
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
    if (errors['pattern']) {
      if (control === this.nombre) return 'Ingrese solo letras';
    }
    return '';
  }
  cargarimagen(event: any): void {
    let file: File = <File>event.target.files[0];
    this.name = file.name;
    this.nombreimagen?.setValue(this.name);
    this.previsualizar(file);
    this.categoriaServ.subirimagen(file, this.name).subscribe((data) => {});
  }

  previsualizar(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.previsualizacion = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}
