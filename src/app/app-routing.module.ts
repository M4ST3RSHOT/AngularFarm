import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { ProductoComponent } from './producto/producto.component';
import { ClienteComponent } from './cliente/cliente.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { PersonalComponent } from './personal/personal.component';
import { CompraComponent } from './compra/compra.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { ReporteComponent } from './reporte/reporte.component';
import { FacturaComponent } from './factura/factura.component';
import { NuevaFacturaComponent } from './factura/nueva-factura/nueva-factura.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './logout/logout.component';
import { FarmaciaComponent } from './farmacia/farmacia.component';
import { NuevaCompraComponent } from './compra/nueva-compra/nueva-compra.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'producto', component: ProductoComponent },
  { path: 'cliente', component: ClienteComponent },
  { path: 'categoria', component: CategoriaComponent },
  { path: 'personal', component: PersonalComponent },
  { path: 'compra', component: CompraComponent },
  { path: 'crear-compra', component: NuevaCompraComponent },
  { path: 'proveedor', component: ProveedorComponent },
  { path: 'reporte', component: ReporteComponent },
  { path: 'venta', component: FacturaComponent },
  { path: 'crear-venta', component: NuevaFacturaComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'farmacia', component: FarmaciaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
