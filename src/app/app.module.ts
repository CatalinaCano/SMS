//Modulos
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { SubirArchivoService } from './services/subir-archivo.service';
import { MsAdalAngular6Module, AuthenticationGuard } from 'microsoft-adal-angular6';
import { LoginGuard } from './services/login.guard';
import { LoginService } from './services/login.service';


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
    CommonModule,
    MsAdalAngular6Module.forRoot({
      tenant: 'catalinacano08hotmail.onmicrosoft.com', //Tenat de computec computec.com
      clientId: '63f3972c-81cc-4cce-9d50-d0344d1e0c8b', //Client id Computec 45730a7a-471a-4dfa-8558-03f7ae5416b9
      redirectUri: window.location.origin,
      endpoints: {
        'https://login.microsoftonline.com/41499052-44d4-41f5-8a80-1d37b17703c8/oauth2/authorize': 'xxx-bae6-4760-b434-xxx'
        //'http://localhost:4200/#/produccion': 'xxx-bae6-4760-b434-xxx'
      },
      navigateToLoginRequestUrl: false,
      cacheLocation: 'localStorage'
    }),
  ],
  providers: [
    OrdenesService,
    ClientesService,
    ProductosService,
    ProveedoresService,
    SubirArchivoService,
    AuthenticationGuard,
    LoginGuard,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
