// import { NgModule } from '@angular/core';
// import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
// import { MenuComponent } from './menu/menu.component';
// import { InicioComponent } from './inicio/inicio.component';
// import { ProductoComponent } from './producto/producto.component';
// import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// import { MatButtonModule } from '@angular/material/button';
// import { MatFormField, MatInputModule } from '@angular/material/input';

// import { MatIconModule } from '@angular/material/icon';

// import { ToastrModule } from 'ngx-toastr';

// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatPseudoCheckboxModule } from '@angular/material/core';
// import { MatDialogModule } from '@angular/material/dialog';
// import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';

// import { MatSlideToggleModule } from '@angular/material/slide-toggle';
// import { ClienteComponent } from './cliente/cliente.component';
// import { MaterialModule } from './Material.module';

// import { RouterModule, Routes } from '@angular/router';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideClientHydration } from '@angular/platform-browser';

import { PortalModule } from '@angular/cdk/portal';
import { BrowserModule } from '@angular/platform-browser';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CdkTreeModule } from '@angular/cdk/tree';
import { LayoutModule } from '@angular/cdk/layout';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { OverlayModule } from '@angular/cdk/overlay';
import { DatePipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MenuComponent } from './menu/menu.component';
import { ClienteComponent } from './cliente/cliente.component';

import { DetallarCompraComponent } from './compra/detallar-compra/detallar-compra.component';
import { ProductoComponent } from './producto/producto.component';
import { CrearProductoComponent } from './producto/crear-producto/crear-producto.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { PersonalComponent } from './personal/personal.component';
import { CompraComponent } from './compra/compra.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { ReporteComponent } from './reporte/reporte.component';
import { CrearPersonalComponent } from './personal/crear-personal/crear-personal.component';

import { FormControl } from '@angular/forms';
import { ImagenRotaDirective } from './imagen-rota.directive';
import { FacturaComponent } from './factura/factura.component';
import { FarmaciaComponent } from './farmacia/farmacia.component';
import { CrearCategoriaComponent } from './categoria/crear-categoria/crear-categoria.component';
import { CrearClienteComponent } from './cliente/crear-cliente/crear-cliente.component';
import { CrearProveedorComponent } from './proveedor/crear-proveedor/crear-proveedor.component';
import { NuevaFacturaComponent } from './factura/nueva-factura/nueva-factura.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './logout/logout.component';
import { AdminComponent } from './menu/admin/admin.component';
import { InventarioComponent } from './menu/inventario/inventario.component';
import { VentasComponent } from './menu/ventas/ventas.component';
import { NuevaCompraComponent } from './compra/nueva-compra/nueva-compra.component';
import { DetallarFacturaComponent } from './factura/detallar-factura/detallar-factura.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ReportecomprasComponent } from './reporte/reportecompras/reportecompras.component';
import { ReporteeconomicoComponent } from './reporte/reporteeconomico/reporteeconomico.component';
import { ReporteinventarioComponent } from './reporte/reporteinventario/reporteinventario.component';
import { ReporteventasComponent } from './reporte/reporteventas/reporteventas.component';
import { ReporteventasusuarioComponent } from './reporte/reporteventasusuario/reporteventasusuario.component';
import { DetallarProductoComponent } from './categoria/detallar-producto/detallar-producto.component';
import { DetallarProductoProveedorComponent } from './proveedor/detallar-producto-proveedor/detallar-producto-proveedor.component';
import { ImportarinventarioComponent } from './producto/importarinventario/importarinventario.component';
import { EmergenteReporteComprasComponent } from './reporte/reportecompras/emergente-reporte-compras/emergente-reporte-compras.component';
import { EmergenteReporteInventarioComponent } from './reporte/reporteinventario/emergente-reporte-inventario/emergente-reporte-inventario.component';
import { EmergenteReporteVentasComponent } from './reporte/reporteventas/emergente-reporte-ventas/emergente-reporte-ventas.component';

const router: Routes = [];
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ProductoComponent,
    ClienteComponent,
    CrearProductoComponent,
    CategoriaComponent,
    PersonalComponent,
    CompraComponent,
    ProveedorComponent,
    ReporteComponent,
    CrearPersonalComponent,
    ImagenRotaDirective,
    FacturaComponent,
    FarmaciaComponent,
    CrearCategoriaComponent,
    CrearClienteComponent,
    CrearProveedorComponent,
    NuevaFacturaComponent,
    LoginComponent,
    HomeComponent,
    LogoutComponent,
    AdminComponent,
    InventarioComponent,
    VentasComponent,
    NuevaCompraComponent,
    DetallarFacturaComponent,
    DetallarCompraComponent,
    ReportecomprasComponent,
    ReporteeconomicoComponent,
    ReporteinventarioComponent,
    ReporteventasComponent,
    ReporteventasusuarioComponent,
    DetallarProductoComponent,
    DetallarProductoProveedorComponent,
    ImportarinventarioComponent,
    EmergenteReporteComprasComponent,
    EmergenteReporteInventarioComponent,
    EmergenteReporteVentasComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(router), //,{useHash:true}),
    MatSliderModule,
    MatListModule,
    MatIconModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,
    CdkTreeModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    AppRoutingModule,
    HttpClientModule,
    NgxChartsModule,
    BrowserAnimationsModule,
  ],
  providers: [provideClientHydration(), provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
