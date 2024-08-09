import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ImprimirService } from '../../services/imprimir.service';

@Component({
  selector: 'app-reportecompras',
  templateUrl: './reportecompras.component.html',
  styleUrl: './reportecompras.component.css'
})
export class ReportecomprasComponent {

  constructor(private imprimirsrv:ImprimirService){}

  agregar=new FormGroup({
    fechainicio: new FormControl('',[Validators.required]),
    fechafin: new FormControl('',[Validators.required]),
  })

  Onimprimir(){
    const encabezado = ["id","nombre","telefono","correo"]
    const cuerpo = ["1","Yamilito Aguirre","76133846","yamilito@gmail.com"]

    this.imprimirsrv.imprimir(encabezado,cuerpo,"Mi primer pdf en angular",true);
  }

}
