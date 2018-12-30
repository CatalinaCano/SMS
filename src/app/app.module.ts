import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { PanelInformacionComponent } from './components/shared/panel-informacion/panel-informacion.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { BreadcrumbComponent } from './components/shared/breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PanelInformacionComponent,
    FormularioComponent,
    BreadcrumbComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
