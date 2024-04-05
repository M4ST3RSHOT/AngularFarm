import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cliente } from '../../models/cliente';
import { Observable, map, startWith } from 'rxjs';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-cliente-factura',
  templateUrl: './cliente-factura.component.html',
  styleUrl: './cliente-factura.component.css'
})
export class ClienteFacturaComponent implements OnInit{

constructor(private cliente:ClienteService){}

ngOnInit(): void {
  
}

cargar_info(){

}

setear_cliente(e:any){

}

error_ci(){
}
}
