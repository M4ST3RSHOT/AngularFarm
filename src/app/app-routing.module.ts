import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { MenuComponent } from './menu/menu.component';
import { ProductoComponent } from './producto/producto.component';

const routes: Routes = [
  { path: 'menu', component: MenuComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'producto', component: ProductoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
