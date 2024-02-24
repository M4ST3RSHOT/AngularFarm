import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { MenuComponent } from './menu/menu.component';
import { ProductoComponent } from './producto/producto.component';
import { ClienteComponent } from './cliente/cliente.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { PersonalComponent } from './personal/personal.component';
import { CompraComponent } from './compra/compra.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { ReporteComponent } from './reporte/reporte.component';
import { VentaComponent } from './venta/venta.component';

const routes: Routes = [
  { path: 'menu', component: MenuComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'producto', component: ProductoComponent },
  { path: 'cliente', component: ClienteComponent },
  { path: 'categoria', component: CategoriaComponent },
  { path: 'personal', component: PersonalComponent },
  { path: 'compra', component: CompraComponent },
  { path: 'proveedor', component: ProveedorComponent },
  { path: 'reporte', component: ReporteComponent },
  { path: 'venta', component: VentaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
