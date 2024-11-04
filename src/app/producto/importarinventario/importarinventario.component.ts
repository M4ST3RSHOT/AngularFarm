import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { error, info } from 'console';
import * as XLSX from 'xlsx';
import { Producto } from '../../models/producto';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../models/categoria';
import { ProductoService } from '../../services/producto.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-importarinventario',
  templateUrl: './importarinventario.component.html',
  styleUrl: './importarinventario.component.css',
})
export class ImportarinventarioComponent implements OnInit {
  constructor(
    private categoriaserv: CategoriaService,
    private productoserv: ProductoService,
    private toastr: ToastrService
  ) {}
  categoria: Categoria[] = [];
  ngOnInit(): void {
    this.categoriaserv.listar().subscribe((data) => {
      this.categoria = data;
    });
  }

  infoarchivo: any[] = [];
  matrizproducto: any[] = [];
  public name: string = '';
  agregar = new FormGroup({
    archivo: new FormControl('', []),
  });

  data: Producto[] = [];

  fileName: string = ''; // Almacena el nombre del archivo seleccionado
  // Esta función se llama cuando se selecciona el archivo

  cargararchivo(evt: any) {
    const target: DataTransfer = <DataTransfer>evt.target;

    if (target.files.length !== 1) {
      console.error('No se pueden cargar varios archivos');
      return;
    }

    const reader: FileReader = new FileReader();

    // Procesar el archivo cuando se carga
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;

      // Usamos SheetJS para leer el archivo
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      // Solo leemos la primera hoja
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      // Convertir los datos en formato JSON

      this.infoarchivo = [];
      this.data = [];
      this.matrizproducto = [];
      this.data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      for (let i = 1; i < this.data.length; i++) {
        this.infoarchivo[i - 1] = this.data[i];
      }

      for (let i = 0; i < this.infoarchivo.length; i++) {
        let producto: Producto = {
          id: 0,
          nombre: '',
          codigo: '',
          descripcion: '',
          unidad: '',
          peso: '',
          categoria_id: '',
          precio_compra: '',
          precio_venta: '',
          imagen: '',
          stock: '',
        }; //cualquier cosita mi rey ESTO ES MAPEAR

        producto.id = this.infoarchivo[i][0];
        producto.codigo = this.infoarchivo[i][1];
        producto.nombre = this.infoarchivo[i][2];
        producto.descripcion = this.infoarchivo[i][3];
        producto.unidad = this.infoarchivo[i][4];
        producto.peso = this.infoarchivo[i][5];
        producto.categoria_id = this.infoarchivo[i][6];
        producto.precio_compra = this.infoarchivo[i][7];
        producto.precio_venta = this.infoarchivo[i][8];
        producto.imagen = this.infoarchivo[i][9];
        producto.stock = this.infoarchivo[i][10];
        this.matrizproducto.push(producto);
      }

      //transformando los nombre de categorias en id
      for (let i = 0; i < this.matrizproducto.length; i++) {
        for (let j = 0; j < this.categoria.length; j++) {
          if (this.categoria[j].nombre == this.matrizproducto[i].categoria_id) {
            this.matrizproducto[i].categoria_id = this.categoria[j].id;
          }
        }
      }
    };
    // Leer el archivo como binario
    reader.readAsBinaryString(target.files[0]);
  }
  insertar() {
    console.log(this.matrizproducto);
    this.productoserv.storeMultiple(this.matrizproducto).subscribe(
      (data: any) => {
        if (data.productosGuardados.length != 0) {
          for (let i = 0; i < data.productosGuardados.length; i++) {
            this.toastr.success(
              data.productosGuardados[i].nombre + 'se registro con exito'
            );
          }
        }
        if (data.errores.length != 0) {
          for (let i = 0; i < data.errores.length; i++) {
            this.toastr.warning(
              data.errores[i].codigo,
              data.errores[i].mensaje
            );
          }
        }
      },
      (error) => {
        this.toastr.warning('Ocurrio un error en el servidor');
      }
    );
  }
}
