import { Component, Inject, OnInit } from '@angular/core';
import { FacturaComponent } from '../factura.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FacturaService } from '../../services/factura.service';
import { Factura } from '../../models/factura';
import { Personal } from '../../models/personal';
import { Cliente } from '../../models/cliente';

@Component({
  selector: 'app-detallar-factura',
  templateUrl: './detallar-factura.component.html',
  styleUrl: './detallar-factura.component.css'
})
export class DetallarFacturaComponent implements OnInit{
  constructor(public dialogRef:MatDialogRef<FacturaComponent>, @ Inject (MAT_DIALOG_DATA) public data:any, private factura:FacturaService){}

  info:number=0

  infousuario:Personal | undefined
  infofactura:Factura | undefined
  infodetalle:any[]=[]
  infocliente:Cliente | undefined

  ngOnInit(): void {
    this.info= this.data.idfactura
    this.factura.detallar(this.info).subscribe(a=>{
      this.infofactura=a[0][0]
      this.infodetalle=a[1][0]
      this.infocliente=a[2][0]
      this.infousuario=a[3][0]
      
    })
  }
}
