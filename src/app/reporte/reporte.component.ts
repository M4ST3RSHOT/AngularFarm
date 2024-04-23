import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.css'
})
export class ReporteComponent implements OnInit{
  constructor(private route:Router,private toastr:ToastrService){}
  type:string | null | undefined
  ngOnInit(){
    this.type = localStorage.getItem("access")
    if(this.type=="" ||this.type=="2" )
    {      
      this.toastr.warning("No tiene acceso",'Inicia sesion');
      this.route.navigate(["/home"]);
    }
  }
}
