import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompraComponent } from '../compra.component';
import { CompraService } from '../../services/compra.service';
import { Personal } from '../../models/personal';
import { Compra } from '../../models/compra';
import { Proveedor } from '../../models/proveedor';

@Component({
  selector: 'app-detallar-compra',
  templateUrl: './detallar-compra.component.html',
  styleUrl: './detallar-compra.component.css'
})
export class DetallarCompraComponent implements OnInit{
  constructor(public dialogRef:MatDialogRef<CompraComponent>, @ Inject (MAT_DIALOG_DATA) public data:any, private compra:CompraService){}

  info:number=0

  infousuario:Personal | undefined
  infoadquiere:Compra | undefined
  infolote:any[]=[]
  infoproveedor:Proveedor | undefined

  ngOnInit(): void {
    this.info= this.data.idadquiere
    this.compra.detallar(this.info).subscribe(a=>{
      
      this.infoadquiere=a[0][0]
      this.infolote=a[1][0]
      this.infoproveedor=a[2][0]
      this.infousuario=a[3][0]
    })
  }
}

