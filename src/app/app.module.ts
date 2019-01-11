//Modulos
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
//Rutas
import {APP_ROUTING} from './app.routes';

//Servicios
import { OrdenesService } from './services/ordenes.service';
import { ClientesService } from './services/clientes.service';
import { ProductosService } from './services/productos.service';
import { ProveedoresService } from './services/proveedores.service';



//Componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { PanelInformacionComponent } from './components/shared/panel-informacion/panel-informacion.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { BreadcrumbComponent } from './components/shared/breadcrumb/breadcrumb.component';
import { InformacionComponent } from './components/shared/informacion/informacion.component';
import { FormComponent } from './components/form/form.component';
import { InicioComponent } from './components/shared/inicio/inicio.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PanelInformacionComponent,
    FormularioComponent,
    BreadcrumbComponent,
    InformacionComponent,
    FormComponent,
    InicioComponent

  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [
    OrdenesService,
    ClientesService,
    ProductosService,
    ProveedoresService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
