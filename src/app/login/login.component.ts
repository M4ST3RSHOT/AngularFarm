import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';
import { Personal } from '../models/personal';
import { environment } from '../environments/environments.prod';
import { PersonalService } from '../services/personal.service';
import { error } from 'console';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private personal: PersonalService,
    private toastr: ToastrService,
    private route: Router,
    private auth: AuthServiceService
  ) {}
  base = environment.base;
  error = null;
  hide = true;
  nuevo = new FormGroup({
    nombre: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(15),
      Validators.pattern(/^[a-zA-Z\s]*$/),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^[a-zA-Z0-9\s]*$/),
    ]),
  });

  get nombre() {
    return this.nuevo.get('nombre_producto');
  }
  get password() {
    return this.nuevo.get('descripcion');
  }

  onLogin() {
    let form = this.nuevo.value;
    this.auth.login(form).subscribe(
      (data) => {
        this.toastr.success('Haz iniciado Sesion', 'En hora buena!');
        let token: string = data['access_token'];
        let personal: Personal = data['user'][0];
        localStorage.setItem('id_usuario', personal.id + '');
        localStorage.setItem('nombre_usuario', personal.nombre);
        localStorage.setItem('password_usuario', personal.password);
        localStorage.setItem('tipo_usuario', personal.tipo);
        localStorage.setItem('ci_usuario', personal.ci);
        localStorage.setItem('apellido_usuario', personal.apellido);
        localStorage.setItem('imagen_usuario', personal.imagen);
        localStorage.setItem('token', token);
        switch (personal.tipo) {
          case 'Administrador':
            localStorage.setItem('access', 1 + '');
            this.toastr.success(
              'Haz iniciado Sesión como administrador',
              'En hora buena!'
            );
            this.route.navigate(['/home']);
            break;
          case 'Ventas':
            localStorage.setItem('access', 2 + '');
            this.toastr.success(
              'Haz iniciado Sesión como ventas',
              'En hora buena!'
            );
            this.route.navigateByUrl('/home');
            break;
          case 'Inventario':
            localStorage.setItem('access', 3 + '');
            this.toastr.success(
              'Haz iniciado Sesión como inventario',
              'En hora buena!'
            );
            this.route.navigateByUrl('/home');
            break;
          default:
            console.log('Usuario Incorrecto, intentelo de nuevo');
            this.route.navigateByUrl('/home');
            break;
        }
      },
      (error) => {
        this.error = error.status;
        if (this.error == 500) this.toastr.error('Revise su conexión', 'Error');
      }
    );
  }

  // error_nombre(): string {
  //   const errors = this.nombre?.errors;
  //   if (!errors) return '';

  //   if (errors['required']) return 'Campo Obligatorio';
  //   if (errors['minlength'])
  //     return `Ingrese mínimo ${errors['minlength'].requiredLength} caracteres`;
  //   if (errors['maxlength'])
  //     return `Ingrese maximo ${errors['maxlength'].requiredLength} caracteres`;
  //   if (errors['pattern']) return 'Ingrese solo letras y/o números';

  //   return '';
  // }

  getErrorMessage(controlName: string): string {
    const control = this.nuevo.get(controlName);
    if (!control || !control.errors) return '';

    const errors = control.errors;

    if (errors['required']) return 'Campo Obligatorio';
    if (errors['minlength'])
      return `Ingrese mínimo ${errors['minlength'].requiredLength} caracteres`;
    if (errors['maxlength'])
      return `Ingrese máximo ${errors['maxlength'].requiredLength} caracteres`;
    if (errors['pattern']) {
      if (control === this.password) return 'Solamente letras y numeros';
      if (control === this.nombre) return 'Ingrese solo letras ';
    }
    return '';
  }
}
