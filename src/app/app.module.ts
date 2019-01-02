import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Rutas
import {APP_ROUTING} from './app.routes';

//Servicios
import { OrdenesService } from './services/ordenes.service';

//Componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { PanelInformacionComponent } from './components/shared/panel-informacion/panel-informacion.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { BreadcrumbComponent } from './components/shared/breadcrumb/breadcrumb.component';
import { InformacionComponent } from './components/shared/informacion/informacion.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PanelInformacionComponent,
    FormularioComponent,
    BreadcrumbComponent,
    InformacionComponent

  ],
  imports: [
    BrowserModule,
    APP_ROUTING
  ],
  providers: [
    OrdenesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
