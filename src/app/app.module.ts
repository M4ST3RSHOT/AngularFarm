import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { InicioComponent } from './inicio/inicio.component';
import { ProductoComponent } from './producto/producto.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatInputModule } from '@angular/material/input';

import { MatIconModule } from '@angular/material/icon';

import { ToastrModule } from 'ngx-toastr';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    InicioComponent,
    ProductoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatPseudoCheckboxModule,
    MatInputModule,
    MatIconModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormField,
    MatFormFieldModule,
    MatSlideToggleModule

  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
