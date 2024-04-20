import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private route:Router,private toastr:ToastrService){}
  type:string | null | undefined
  ngOnInit(){
    this.type = localStorage.getItem("access")
    if(this.type=="")
    {      
      this.toastr.warning("No inicio Sesion",'Inicia sesion');
      this.route.navigate(["/login"]);
    }
  }

  volver(){

  }
  iniciar_sesion(){

  }
}
