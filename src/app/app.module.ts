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
import { RouterModule, Routes } from "@angular/router";
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


import { InicioComponent } from './inicio/inicio.component';
import { ProductoComponent } from './producto/producto.component';
import { CrearProductoComponent } from './producto/crear-producto/crear-producto.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { PersonalComponent } from './personal/personal.component';
import { VentaComponent } from './venta/venta.component';
import { CompraComponent } from './compra/compra.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { ReporteComponent } from './reporte/reporte.component';
import { CrearPersonalComponent } from './personal/crear-personal/crear-personal.component';

import { FormControl } from '@angular/forms';
import { ImagenRotaDirective } from './imagen-rota.directive';


const router: Routes = [];
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    InicioComponent,
    ProductoComponent,
    ClienteComponent,
    CrearProductoComponent,
    CategoriaComponent,
    PersonalComponent,
    VentaComponent,
    CompraComponent,
    ProveedorComponent,
    ReporteComponent,
    CrearPersonalComponent,
    ImagenRotaDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(router),//,{useHash:true}),
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
    HttpClientModule

  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
