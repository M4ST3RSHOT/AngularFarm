import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appImagenRota]'
})
export class ImagenRotaDirective{

  constructor(private elementRef:ElementRef) { }
  @HostListener('error')
  cargarimagenrota(){
    let img=this.elementRef.nativeElement
    img.src='assets/imagenrota.jpg'
  }
}

