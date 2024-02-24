import { Component, OnInit } from '@angular/core';
import { CategoriaService } from './categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css'
})
export class CategoriaComponent implements OnInit {

  constructor(private categoria: CategoriaService) { }
  ngOnInit(): void {
    this.categoria.listar_categoria().subscribe((data: any) => {
      console.log(data)
    })
  }
}

