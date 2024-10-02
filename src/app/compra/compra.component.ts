import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '../environments/environments.prod';
import Swal from 'sweetalert2';
import { CompraService } from '../services/compra.service';
import { Compra } from '../models/compra';
import { DateAdapter } from '@angular/material/core';
import { DetallarCompraComponent } from './detallar-compra/detallar-compra.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrl: './compra.component.css'
})
export class CompraComponent implements OnInit{

  constructor(private route:Router, public dialog: MatDialog, private toastr:ToastrService, private router:Router, private compraserv:CompraService,) { }
  base = environment.base
  compra: any[] = []
  a1:number=0

  type:string | null | undefined
  ngOnInit(): void {
    this.type = localStorage.getItem("access")
    if(this.type==""||this.type=="3" )
    {      
      this.toastr.warning("No tiene acceso",'Inicia sesion');
      this.route.navigate(["/home"]);
    }
    this.compraserv.listar().subscribe(data => {
      this.compra = data
      
      this.dataSource = new MatTableDataSource(this.compra);
      this.dataSource.paginator = this.paginator;
    })
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  displayedColumns: string[] = ['id','personal','proveedor','fecha','montototal','opcion'];
  dataSource!: MatTableDataSource<any>;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator = this.paginator;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  eliminar(item:any){}

  detallarcompra(item:any){
    const dialogRef = this.dialog.open(DetallarCompraComponent,{data:item});
}

  nueva_factura():void {
    this.router.navigate(['/crear-compra']);
  }

  eliminar_factura(item:Compra):void{
    Swal.fire({
      title: 'Esta seguro que quieres eliminar este registro?',
      text: item.fecha+" "+item.id,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar.',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        Swal.fire('Eliminado!', 'El usuario a sido eliminado exitosamente', 'success');
        this.compraserv.eliminar(item.id).subscribe(data=>{
          this.compra=data
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado', 'No se elimino el registro', 'error');
      }
    });
  }


}
