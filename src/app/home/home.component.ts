import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  constructor(private route:Router,private toastr:ToastrService){}
  type:string | null | undefined
  ngOnInit(){
    console.log(localStorage.getItem("access"))
    console.log(this.type)
    this.type = localStorage.getItem("access")
    if(this.type=="" ||this.type=="2" ||this.type=="3" )
    {      
      this.toastr.warning("No tiene acceso",'Inicia sesion');
      this.route.navigate(["/home"]);
    }
  }
}
