import { Component, OnInit } from '@angular/core';
import { Personal } from '../models/personal';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent implements OnInit{

  nombre:string | null | undefined
  apellido:string | null | undefined
  tipo:string | null | undefined

  constructor(private route:Router,private toastr:ToastrService){}
  ngOnInit(): void {
    this.nombre= localStorage.getItem('nombre_usuario');
    this.apellido = localStorage.getItem('apellido_usuario');
    this.tipo = localStorage.getItem('tipo_usuario');
  }

  salir(){
    this.route.navigate(["/login"]);
    this.toastr.success("Haz Cerrardo Sesion",'Hasta luego!');
    localStorage.setItem('id_usuario',"")
        localStorage.setItem('nombre_usuario',"")
        localStorage.setItem('email_usuario',"")
        localStorage.setItem('password_usuario',"")
        localStorage.setItem('fechainicio_usuario',"")
        localStorage.setItem('tipo_usuario',"")
        localStorage.setItem('ci_usuario',"")
        localStorage.setItem('apellido_usuario',"")
        localStorage.setItem('direccion_usuario',"")
        localStorage.setItem('telefono_usuario',"")
        localStorage.setItem('salario_usuario',"")
        localStorage.setItem('farmaciaid_usuario',"")
        localStorage.setItem('imagen_usuario',"")
        localStorage.setItem('token',"")
    localStorage.setItem('access',"")

  }
}
